import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fundamentals.css";

const Fundamentals = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Busca os dados na API
    const fetchPosts = async (pageNumber = 1) => {
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5000/api/fundamentals/search?page=${pageNumber}&limit=1`);

            setPosts(response.data.data);
            setPage(response.data.page);
            setTotalPages(response.data.totalPages);
        } catch(error) {
            console.error("Erro ao mostrar postagens: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (!posts.length) {
        return <p className="loading">Carregando...</p>;
    }
    

    // Paginação
    const handlePageChange = (direction) => {
        const newPage = direction === "next" ? page + 1 : page - 1;

        if (newPage > 0 && newPage <= totalPages) {
            fetchPosts(newPage);
        }
    }

    return(
        <div className="fundamentals">
            <h1 className="fundamentals_title">Fundamentos</h1>
            <p className="fundamentals_subtitle">Conteúdo relacionado aos  Fundamentos do Desenvolvimento Web.</p>
            <div className="fundamentals_container">
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange("prev")}
                    >Anterior</button>
                    <span>{page} | {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => handlePageChange("next")}
                    >Próxima</button>
                </div>
                { loading ? (
                    <p className="loading">Carregando...</p>
                ) : (
                    posts && posts.map((post) => (
                        <div key={post._id} className="fundamentals_card">
                            <h3 className="fundamentals_card_title">{post.title}</h3>
                            <p className="fundamentals_card_content">{post.content}</p>
                            <p className="fundamentals_card_date">{new Date(post.createdAt).toLocaleDateString()}</p>
                            <img
                                src={post.images || "https://via.placeholder.com/150"}
                                className="fundamentals_img"
                                alt={post.image || "Imagem não disponível"}
                            />
                            <a 
                                href={post.links || "#"} 
                                className="fundamentals_link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {post.links || "Link não disponível"}
                            </a>
                            <pre className="fundamentals_code">{post.codes}</pre>
                        </div>
                    ))
                )}
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange("prev")}
                    >Anterior</button>
                    <span>{page} | {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => handlePageChange("next")}
                    >Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default Fundamentals;