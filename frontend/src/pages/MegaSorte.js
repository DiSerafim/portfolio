import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const MegaSorte = () => {
    // Gerencia o estado do componente
    const [sequences, setSequences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [predictionStats, setPredictionStats] = useState([]); // Para armazenar dados de treinamento e tentativas
    // const [verifiedSequences, setVerifiedSequences] = useState([]); // Sequências verificadas
    // const [attempts, setAttempts] = useState(0); // Número de tentativas
    // const [currentAttempt, setCurrentAttempt] = useState(0); // Mostra a tentativa em tempo real
    const [manualSequence, setManualSequence] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [editSequenceId, setEditSequenceId] = useState(null); // Armazena o ID da sequência em edição
    const [editSequence, setEditSequence] = useState(""); // Armazena a nova sequência

    const stopSearchRef = useRef(false); // Referência para controlar a parada da busca

    // Função para Carregar sequências do backend | Função assíncrona
    const loadSequences = async () => {
        try {
            setLoading(true); // Ativa o estado do carregamento
            const response = await axios.get("http://localhost:5000/api/sequences");
            setSequences(response.data); // Armazenas as sequências recebidas do DB no estado sequences
        } catch (err) {
            setError("Não foi possível carregar os dados. Por favor, tente novamente mais tarde. " + err.message); // Erro, caso falhar
        } finally {
            setLoading(false); // Desativa o estado do carregamento
        }
    };

    // Função para treinar o modelo com as sequências armazenadas
    const trainModel = () => {
        if (sequences.length === 0) return [];
    
        const coOccurrenceMap = new Map();
    
        // Construir matriz de co-ocorrência
        sequences.forEach((seq) => {
            const numbers = seq.numbers;
            for (let i = 0; i < numbers.length; i++) {
                for (let j = i + 1; j < numbers.length; j++) {
                    const key = [numbers[i], numbers[j]].sort((a, b) => a - b).join("-");
                    coOccurrenceMap.set(key, (coOccurrenceMap.get(key) || 0) + 1);
                }
            }
        });
    
        // Calcular pesos dos números com base na co-ocorrência
        const weights = new Map();
        sequences.flatMap(seq => seq.numbers).forEach(num => {
            weights.set(num, (weights.get(num) || 0) + 1);
        });
    
        return { weights, coOccurrenceMap };
    };
    
    const generateSequence = (trainedData) => {
        const { weights, coOccurrenceMap } = trainedData;
        const sequence = [];
        const usedNumbers = new Set();
    
        // Selecionar números com base nos pesos
        while (sequence.length < 6) {
            const candidates = Array.from(weights.keys()).filter((num) => !usedNumbers.has(num));
            if (candidates.length === 0) break;
    
            // Escolher o número com maior peso
            const nextNumber = candidates.reduce((max, num) =>
                weights.get(num) > weights.get(max) ? num : max, candidates[0]);
    
            sequence.push(nextNumber);
            usedNumbers.add(nextNumber);
    
            // Ajustar pesos com base na co-ocorrência
            for (let i = 0; i < sequence.length - 1; i++) {
                const key = [sequence[i], nextNumber].sort((a, b) => a - b).join("-");
                if (coOccurrenceMap.has(key)) {
                    weights.set(nextNumber, weights.get(nextNumber) + coOccurrenceMap.get(key));
                }
            }
        }
    
        // Preencher com números aleatórios únicos, se necessário
        while (sequence.length < 6) {
            const randomNumber = Math.floor(Math.random() * 60) + 1;
            if (!usedNumbers.has(randomNumber)) {
                sequence.push(randomNumber);
                usedNumbers.add(randomNumber);
            }
        }
    
        return sequence.sort((a, b) => a - b);
    };
    
    const predictNextSequence = async () => {
        setLoading(true);
        setError("");
        try {
            // Treinar modelo com dados armazenados
            const trainedData = trainModel();
    
            // Gerar próxima sequência
            let nextSequence = null;
            const seenSequences = new Set(sequences.map((seq) => JSON.stringify(seq.numbers)));
    
            while (!nextSequence) {
                const generatedSequence = generateSequence(trainedData);
    
                // Verificar unicidade
                const sequenceKey = JSON.stringify(generatedSequence);
                if (!seenSequences.has(sequenceKey)) {
                    nextSequence = generatedSequence;
                    seenSequences.add(sequenceKey);
                }
            }
    
            // Enviar ao servidor e atualizar estado
            const postResponse = await axios.post("http://localhost:5000/api/sequences", { numbers: nextSequence });
            setSequences((prev) => [...prev, postResponse.data]);
    
            // Atualizar estatísticas
            setPredictionStats((prev) => [
                ...prev,
                { sequence: nextSequence, trained: true, timestamp: new Date().toISOString() },
            ]);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    // Função para Inserir a sequência Manualmente
    const handleManualInsert = async () => {
        setError("");

        // Valida a sequência digitada
        const numbers = manualSequence.split(",").map((num) => parseInt(num.trim())).filter((num) => !isNaN(num));

        if (numbers.length !== 6 || new Set(numbers).size !== 6 || numbers.some((num) => num < 1 || num > 60)) {
            setError("A sequência deve conter exatamente 6 números únicos entre 1 e 60.");
            return;
        }

        try {
            setLoading(true);

            // Verifica se a sequência existe no DB
            const checkResponse = await axios.get("http://localhost:5000/api/sequences/check", {
                params: { numbers: numbers.join(", ") }
            });

            if (checkResponse.data.exists) {
                setError("Essa sequência já existe.");
                return
            };

            const response = await axios.post("http://localhost:5000/api/sequences", {numbers});

            setSequences((prevSequences) => [...prevSequences, response.data]);
            setManualSequence(""); // Limpa o campo de entrada após o sucesso
        } catch(err) {
            setError("Erro ao inserir a sequencia: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Função para Editar uma sequência
    const handleEdit = async () => {
        const numbers = editSequence.split(",").map((num) => parseInt(num.trim())).filter((num) => !isNaN(num));

        if (numbers.length !== 6 || new Set(numbers).size !== 6 || numbers.some((num) => num < 1 || num > 60)) {
            setError("A sequência deve conter exatamente 6 números únicos entre 1 e 60.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:5000/api/sequences/${editSequenceId}`, { numbers });

            setSequences((prevSequences) => prevSequences.map(
                (seq) => (seq._id === editSequenceId ? response.data : seq)
            ));

            setEditSequenceId(null);
            setError("");
        } catch(err) {
            setError("Erro ao editar a sequência: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Função para Apagar uma sequência
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/sequences/${id}`);
            setSequences(sequences.filter((seq) => seq._id !== id));
        } catch(err) {
            setError("Erro ao apagar sequência: ", err.message);
        }
    };

    // Carregar sequências na montagem do componente
    useEffect(() => {
        if (sequences.length === 0) {
            loadSequences(); // Carrega as sequências assim que o componente é exibido
        }
    }, [sequences]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Gerador de Sequências com Treinamento</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
                onClick={predictNextSequence}
                disabled={loading}
                style={{ margin: "10px", padding: "10px 20px" }}
            >Prever Próxima Sequência</button>

            <button
                onClick={() => stopSearchRef.current = true}
                disabled={!loading}
                style={{ margin: "10px", padding: "10px 20px", backgroundColor: "darkred", color: "white" }}
            >Parar a buscar</button>

            <button
                onClick={() => setShowInput(!showInput)}
                style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#274", color: "white" }}
            >Inserir Sequência Manualmente</button>

            {showInput && (
                <div>
                    <h2>Inserir Sequência Manualmente</h2>
                    <input
                        type="text"
                        placeholder="Ex.: 1, 2, 3, 4, 5, 6"
                        value={manualSequence}
                        onChange={(e) => setManualSequence(e.target.value)}
                        style={{ width: "200px", padding: "10px", marginRight: "10px" }}
                    />
                    <button onClick={handleManualInsert} disabled={loading} style={{ padding: "10px 20px", backgroundColor: "green", color: "white" }}>Inserir</button>
                </div>
            )}

            <h2>Sequências Armazenadas {sequences.length}</h2>
            {sequences.length === 0 && <p>Nenhuma sequência encontrada.</p>}
            <ul>
                {sequences.map((seq) => (
                    <li
                        key={seq._id}
                        // style={{color: verifiedSequences.some((s) => JSON.stringify(s) === JSON.stringify(seq.numbers)) ? "green" : "black"}}
                    >
                        {editSequenceId === seq._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editSequence}
                                    onChange={(e) => setEditSequence(e.target.value)}
                                    style={{ width: "150px", padding: "10px", marginRight: "10px" }}
                                />

                                <button
                                    onClick={handleEdit}
                                    disabled={loading}
                                    style={{ marginLeft: "10px", backgroundColor: "transparent", border: "none", color: "#254", fontSize: "20px", cursor: "pointer" }}
                                    title="Salvar"
                                >
                                    <MdOutlineSaveAlt />
                                </button>

                                <button
                                    onClick={() => setEditSequenceId(null)}
                                    style={{ marginLeft: "10px", backgroundColor: "transparent", border: "none", color: "red", fontSize: "20px", cursor: "pointer" }}
                                    title="Não Salvar"
                                >
                                    <ImCancelCircle />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <span>{Array.isArray(seq.numbers) ? seq.numbers.join(", ") : "Formato Inválido"}</span>
                                <button
                                    onClick={() => {
                                        setEditSequenceId(seq._id);
                                        setEditSequence(seq.numbers.join(", "));
                                    }}
                                    style={{ marginLeft: "10px", backgroundColor: "transparent", border: "none", color: "#274", fontSize: "20px", cursor: "pointer" }}
                                    title="Editar Esta sequência?"
                                >
                                    <CiEdit />
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(seq._id);
                                    }}
                                    style={{ marginLeft: "10px", backgroundColor: "transparent", border: "none", color: "red", fontSize: "20px", cursor: "pointer" }}
                                    title="Apagar Esta sequência?"
                                >
                                    <RiDeleteBin5Line />
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <h2>Estatísticas de Previsão</h2>
            {predictionStats.length === 0 && <p>Nenhuma previsão realizada ainda.</p>}
            <ul>
                {predictionStats.map((stat, index) => (
                    <li key={index}>
                        Sequência Prevista:{" "}
                        {Array.isArray(stat.sequence) ? stat.sequence.join(", ") : "Formato inválido"} |
                        Treinada:{" "}
                        {stat.trained ? "Sim" : "Não"} |
                        Data:{" "}
                        {stat.timestamp ? new Date(stat.timestamp).toLocaleString() : "Data inválida"}
                    </li>
                ))}
            </ul>

            <h2>Tentativas para encontrar uma sequência única</h2>
            {/* <p>{attempts} Tentativas realizadas</p>*/}
            {/* <p>Tentativa N°: {currentAttempt}</p>*/}
        </div>
    );
};

export default MegaSorte;
