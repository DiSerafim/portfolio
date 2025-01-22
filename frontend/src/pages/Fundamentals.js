import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fundamentals.css";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Fundamentals = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editPostId, setEditPostId] = useState(null); // Abre e fecha formulário
    const [formData, setFormData] = useState({ title: "", content: "", images: "", links: "", codes: "" });

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

    // Editar postagem (Abre o Formulário)
    const handleEdit = (post) => {
        setEditPostId(post._id);
        setFormData({
            title: post.title,
            content: post.content,
            images: post.images,
            links: post.links,
            codes: post.codes
        });
    };

    // Editar postagem (Salva as alterações)
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/fundamentals/${editPostId}`, formData);
            alert("Postagem atualizada!");
            setEditPostId(null);
            fetchPosts(page);
        } catch(error) {
            console.error("Erro ao atualizar postagem:" + error);
            alert("Não foi possível atualizar a postagem");
        }
    };

    // Editar postagem (Lida com as mudanças nos campos)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Deleta postagem
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta postagem?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/fundamentals/${id}`);
                alert("Postagem excluída com sucesso!");
                fetchPosts(page);
            } catch(error) {
                console.error("Erro ao excluir post: " + error);
                alert("Não foi possível excluir este post.");
            }
        }
    };

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

                            <div className="fundamentals_card_actions">
                                <FaEdit
                                    className="icon edit-icon"
                                    onClick={() => handleEdit(post)}
                                    title="Editar esta postagem."
                                />
                                <FaTrash
                                    className="icon delete-icon"
                                    onClick={() => handleDelete(post._id)}
                                    title="Apagar esta postagem."
                                />
                            </div>

                            {editPostId === post._id && (
                                <form className="edit_form" onSubmit={handleSave}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Título"
                                    />

                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="Conteúdo"
                                    />

                                    <input
                                        type="text"
                                        name="images"
                                        value={formData.images}
                                        onChange={handleChange}
                                        placeholder="Link da imagem"
                                    />
                                    <input
                                        type="text"
                                        name="links"
                                        value={formData.links}
                                        onChange={handleChange}
                                        placeholder="Link da fonte"
                                    />

                                    <textarea
                                        name="codes"
                                        value={formData.codes}
                                        onChange={handleChange}
                                        placeholder="Código"
                                    />

                                    <button type="submit">Atualizar</button>
                                    <button type="button" onClick={() => setEditPostId(null)}>
                                        Cancelar
                                    </button>
                                </form>
                            )}

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