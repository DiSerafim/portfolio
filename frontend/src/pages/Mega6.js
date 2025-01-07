import React, { useState, useEffect } from "react";

// Biblioteca para fazer requisições HTTP (GET, POST, etc.).
import axios from "axios";

const Mega6 = () => {
    // Gerencia o estado do componente
    const [sequences, setSequences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [predictionStats, setPredictionStats] = useState([]); // Para armazenar dados de treinamento e tentativas
    const [verifiedSequences, setVerifiedSequences] = useState([]); // Sequências verificadas
    const [attempts, setAttempts] = useState(0); // Número de tentativas
    const [currentAttempt, setCurrentAttempt] = useState(0); // Mostra a tentativa em tempo 

    // Função para carregar sequências do backend | Função assíncrona
    const loadSequences = async () => {
        try {
            setLoading(true); // Ativa o estado do carregamento
            const response = await axios.get("http://localhost:5000/api/sequences");

            setSequences(response.data); // Armazenas as sequências recebidas do DB no estado sequences
        } catch (err) {
            console.error("Erro ao carregar sequências:", err);

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

    // Função para prever a próxima sequência
    const predictNextSequence = async () => {
        setLoading(true);
        setError("");
        setAttempts(0); // Reseta o contador de tentativas
        setVerifiedSequences([]); // Reseta as sequências verificadas

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

            // Loop para aguardar a atualização do estado e permitir tempo para o React renderizar
            while (!nextSequence) {
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

            <button onClick={predictNextSequence} disabled={loading} style={{ margin: "10px", padding: "10px 20px" }}>
                Prever Próxima Sequência
            </button>

            <h2>Sequências Armazenadas</h2>
            {sequences.length === 0 && <p>Nenhuma sequência encontrada.</p>}
            <ul>
                {sequences.map((seq) => (
                    <li
                        key={seq._id}
                        style={{color: verifiedSequences.some((s) => JSON.stringify(s) === JSON.stringify(seq.numbers)) ? "green" : "black"}}
                    >
                        {Array.isArray(seq.numbers) ? seq.numbers.join(", ") : "Formato Inválido"}
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
                        Treinada: {stat.trained ? "Sim" : "Não"} |
                        Data: {stat.timestamp ? new Date(stat.timestamp).toLocaleString() : "Data inválida"}
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
