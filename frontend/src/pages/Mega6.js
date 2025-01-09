import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const Mega6 = () => {
    // Gerencia o estado do componente
    const [sequences, setSequences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [predictionStats, setPredictionStats] = useState([]); // Para armazenar dados de treinamento e tentativas
    const [verifiedSequences, setVerifiedSequences] = useState([]); // Sequências verificadas
    const [attempts, setAttempts] = useState(0); // Número de tentativas
    const [currentAttempt, setCurrentAttempt] = useState(0); // Mostra a tentativa em tempo real
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
        if (sequences.length === 0) return []; // Retorna vazio se não houver sequências

        const frequencyMap = new Map(); // Cria um mapa (Map) para contar a frequência de cada número em todas as sequências.

        // Conta a frequência de cada número nas sequências armazenadas
        sequences.forEach((seq) => {
            seq.numbers.forEach((num) => {
                frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1); // Conta quantas vezes cada número aparece
            });
        });

        // Ordena os números pela frequência em ordem decrescente
        const sortedNumbers = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

        return sortedNumbers.map(([number]) => number); // Retorna apenas os números mais frequentes
    };

    // Função para prever e Inserir a próxima sequência de forma automática
    const predictNextSequence = async () => {
        setLoading(true);
        setError("");
        setAttempts(0); // Reseta o contador de tentativas
        setVerifiedSequences([]); // Reseta as sequências verificadas

        stopSearchRef.current = false; // Reseta o estado de parada ao iniciar a busca

        let attemptCounter = 0;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Função para adicionar um atraso
        
        try {
            // Treina o modelo com base nas sequências anteriores
            const trainedNumbers = trainModel();

            // Gera uma nova sequência com base no treinamento
            const generateUniqueSequence = () => {
                let newSequence = [];
                const usedNumbers = new Set(); // Reinicia para cada tentativa
                attemptCounter++;
                setCurrentAttempt(attemptCounter);

                // Gera uma nova sequência
                const generateSequence = () => {
                    const sequence = [];
                    for (let num of trainedNumbers) {
                        if (sequence.length < 6 && !usedNumbers.has(num)) {
                            sequence.push(num);
                            usedNumbers.add(num);
                        }
                    }

                    // Preenche números aleatórios únicos
                    while (sequence.length < 6) {
                        const randomNumber = Math.floor(Math.random() * 60) + 1;
                        if (!usedNumbers.has(randomNumber)) {
                            sequence.push(randomNumber);
                            usedNumbers.add(randomNumber);
                        }
                    }
            
                    // Ordena para consistência
                    return sequence.sort((a, b) => a - b);
                };

                newSequence = generateSequence();
                const stableSequence = [...newSequence];

                // Verifica se a sequência já foi gerada antes
                if (!sequences.some((seq) => JSON.stringify(seq.numbers) === JSON.stringify(stableSequence))) {
                    setAttempts(attemptCounter); // Atualiza o contador de tentativas
                    return newSequence; // Sequência única encontrada
                }
                return null;
            };

            // Gera a próxima sequência única
            let nextSequence = null;

            // Loop de busca das sequências
            while (!nextSequence) {
                if (stopSearchRef.current) {
                    setLoading(false);
                    return;
                }
                nextSequence = generateUniqueSequence();
                await delay(50); // Adiciona um pequeno atraso para permitir a renderização no frontend
            }

            // Enviar a sequência ao servidor
            const postResponse = await axios.post("http://localhost:5000/api/sequences", { numbers: nextSequence });

            // Atualiza a lista de sequências
            setSequences((prevSequences) => [...prevSequences, postResponse.data]);

            // Atualiza as estatísticas de previsão
            setPredictionStats((prevStats) => [
                ...prevStats,
                { sequence: nextSequence, trained: true, timestamp: new Date().toISOString() },
            ]);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Ocorreu um erro inesperado.");
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
            const response = await axios.post("http://localhost:5000/api/sequences", {numbers});
            setSequences((prevSequences) => [...prevSequences, response.data]);
            setManualSequence(""); // Limpa o campo de entrada após o sucesso
            // setShowInput(false); // Depois de inserir a sequência o campo é escondido.
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
                        style={{color: verifiedSequences.some((s) => JSON.stringify(s) === JSON.stringify(seq.numbers)) ? "green" : "black"}}
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
            <p>{attempts} Tentativas realizadas</p>
            <p>Tentativa N°: {currentAttempt}</p>
        </div>
    );
};

export default Mega6;
