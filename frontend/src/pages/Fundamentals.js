import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./Fundamentals.css";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Fundamentals = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [editPostId, setEditPostId] = useState(null); // Abre e fecha formulário
    const [formData, setFormData] = useState({ title: "", content: "", images: "", links: "", codes: "" });
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState(null);

    const placeholder = "Conteúdo";
    const theme = "snow";
    const { quill, quillRef } = useQuill({ placeholder, theme });

    // Busca os dados na API
    const fetchPosts = async (pageNumber = 1) => {
        setLoading(true);
        setError(null)

        try {
            const response = await axios.get(`http://192.168.10.105:5000/api/fundamentals/search?page=${pageNumber}&limit=1`);

            setPosts(response.data.data);
            setPage(response.data.page);
            setTotalPages(response.data.totalPages);
        } catch(error) {
            console.error("Erro ao mostrar postagens: " + error);
            setError("Erro ao carregar as postagens. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    // Atualiza o conteúdo do formulário quando o editor Quill é alterado
    useEffect(() => {
        if (quill) {
        quill.on("text-change", () => {
            setFormData((prevData) => ({
            ...prevData,
            content: quill.root.innerHTML, // Atualiza o conteúdo com o HTML do editor
            }));
        });
        }
    }, [quill]);


    // Atualiza o conteúdo do formulário quando o editor Quill é alterado
    useEffect(() => {
        if (quill && formData.content) {
            quill.root.innerHTML = formData.content; // Atualiza o conteúdo inicial do editor
        }
    }, [quill, formData.content]);
    

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <p className="loading">Carregando...</p>;
    }

    if (!posts.length && !loading) {
        return <p className="loading">Nenhuma postagem encontrada.</p>;
    }
    
    // Paginação
    const handlePageChange = (direction) => {
        if (loading) return;
        
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
        
        // Preenche o editor quill com o conteúdo
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(post.content);
        };
    };


    // Editar postagem (Salva as alterações)
    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!isFormValid()) return;

        try {
            await axios.put(`http://192.168.10.105:5000/api/fundamentals/${editPostId}`, formData);
            alert("Postagem atualizada!");
            setEditPostId(null);
            clearFormData(); // Limpa o formulário
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
        setLoading(true);
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta postagem?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://192.168.10.105:5000/api/fundamentals/${id}`);

                const newPage = posts.length === 1 && page > 1 ? page - 1 : page;
                alert("Postagem excluída com sucesso!");
                fetchPosts(newPage);
            } catch(error) {
                console.error("Erro ao excluir post: " + error);
                alert("Não foi possível excluir este post.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Limpa os campos dos formulários
    const clearFormData = () => {
        setFormData({ title: "", content: "", images: "", links: "", codes: "" });
    };

    // Valida os formulários
    const isFormValid = () => {
        if (!formData.title.trim()) {
            alert("Título é obrigatório!");
            return false;
        };
        if (!formData.content.trim()) {
            alert("O conteúdo é obrigatório!");
            return false;
        };
        if (formData.images && !/^https?:\/\/.+\..+/.test(formData.images)) {
            alert("Forneça uma URL válida para a imagem.");
            return false;
        };
        return true;
    }

    // Cria uma nova postagem
    const handleCreate = async (e) => {
        e.preventDefault();

        if (!isFormValid()) return;

        try {
            await axios.post(`http://192.168.10.105:5000/api/fundamentals`, formData);
            alert("Nova postagem criada.");
            setShowCreateForm(false); // Fecha o formulário
            clearFormData(); // Limpa o formulário
            fetchPosts(page); // Atualiza as postagens
        } catch(error) {
            console.error("Erro ao fazer nova postagem: ", error);
            alert("Não foi possível criar essa postagem.");
        };
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

                {error && <p className="fundamentals_error">{error}</p>}

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

                                <FaPlus
                                    className="icon create-icon"
                                    onClick={() => setShowCreateForm(!showCreateForm)}
                                    title="Criar nova postagem."
                                />
                            </div>

                            {/* Formulário para criar uma nova postagem*/}
                            {(showCreateForm || editPostId !== null) && (
                                <form className="edit_form" onSubmit={editPostId ? handleSave : handleCreate}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Título"
                                        required
                                    />

                                    <div ref={quillRef} />

                                    <input
                                        type="text"
                                        name="images"
                                        value={formData.images}
                                        onChange={handleChange}
                                        placeholder="Link da imagem"
                                        required
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

                                    <button type="submit">
                                        {editPostId ? "Atualizar Postagem" : "Criar Postagem"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setEditPostId(null); setShowCreateForm(false) }}
                                    >
                        Cancelar
                    </button>
                </form>
            )}

                            <p className="fundamentals_card_content" dangerouslySetInnerHTML={{ __html:post.content }} />
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
                        disabled={loading || page === 1}
                        onClick={() => handlePageChange("prev")}
                    >Anterior</button>
                    <span>{page} | {totalPages}</span>
                    <button
                        disabled={loading || page === totalPages}
                        onClick={() => handlePageChange("next")}
                    >Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default Fundamentals;