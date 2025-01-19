import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fundamentals.css";

const Fundamentals = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/fundamentals");

                setPosts(response.data)
            } catch(err) {
                console.error("Erro ao mostrar postagens: " + err);
            }
        };
        fetchPosts();
    }, []);

    return(
        <div className="fundamentals_container">
            <h1 className="fundamentals_title">Fundamentos</h1>
            <p className="fundamentals_subtitle">Conteúdo relacionado aos fundamentos do desenvolvimento web.</p>
            <div className="fundamentals_map">
                {posts && posts.map((post) => (
                    <div key={post._id} className="fundamentals_">
                        <h3 className="fundamentals_">Title: {post.title}</h3>
                        <p className="fundamentals_">Conteúdo: {post.content}</p>
                        <p>Imagens:</p>
                        <img src={post.images} className="fundamentals_" alt={post.title} />
                        <p>Links:</p>
                        <a href={post.links} className="fundamentals_" target="_blank" rel="noopener noreferrer">Visitar</a>
                        <pre className="fundamentals_">Código: {post.codes}</pre>
                        <data className="fundamentals_">Data da criação: {post.createdAt}</data>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fundamentals;