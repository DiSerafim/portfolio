import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./Fundamentals.css";
import { FaEdit, FaPlus, FaTrash, FaUndo } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Pagination from "../components/Pagination";

const Fundamentals = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editPostId, setEditPostId] = useState(null); // Abre e fecha formulário
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: "",
    links: "",
    codes: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const theme = "snow";
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    modules: {
      syntax: true,
      toolbar: toolbarOptions,
      clipboard: {
        matchVisual: false, // Garante que o texto copiado se adapte ao editor
      },
    },
  };

  const { quill: quillContent, quillRef: quillContentRef } = useQuill({
    placeholder: "Conteúdo",
    theme,
    modules,
  });
  const { quill: quillCodes, quillRef: quillCodesRef } = useQuill({
    placeholder: "Adicione seu código aqui",
    theme,
    modules,
  });

  // Recupera a ultima página visitada
  useEffect(() => {
    const getSavedPage = localStorage.getItem("currentPage");

    if (getSavedPage) {
      setPage(parseInt(getSavedPage, 10));
    }
  }, []);

  // Guarda a ultima página visitada
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("currentPage", page.toString());
    };
    // Armazena a página atual
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [page]);

  // Busca os dados na API
  const fetchPosts = async (pageNumber = page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.10.109:5000/api/fundamentals/search?page=${pageNumber}&limit=1`
      );

      setPosts(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao mostrar postagens: " + error);
      setError("Erro ao carregar as postagens. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Atualiza o conteúdo do formulário quando o editor Quill é alterado
  useEffect(() => {
    if (quillContent) {
      quillContent.on("text-change", () => {
        setFormData((prevData) => ({
          ...prevData,
          content: quillContent.root.innerHTML, // Salva o conteúdo como HTML
        }));
      });
    }
    if (quillCodes) {
      quillCodes.on("text-change", () => {
        setFormData((prevData) => ({
          ...prevData,
          codes: quillCodes.root.innerHTML, // Salva o conteúdo como HTML
        }));
      });
    }
  }, [quillContent, quillCodes]);

  // Preenche os editores Quill ao editar
  useEffect(() => {
    if (quillContent && editPostId && posts.length > 0) {
      const postToEdit = posts.find((post) => post._id === editPostId);

      if (postToEdit?.content && quillContent.clipboard) {
        quillContent.clipboard.dangerouslyPasteHTML(postToEdit.content);
        const length = quillContent.getLength();
        quillContent.setSelection(length, length); // Coloca o cursor ao final do conteúdo
      }
    }
  }, [quillContent, editPostId, posts]);

  useEffect(() => {
    if (quillCodes && editPostId && posts.length > 0) {
      const postToEdit = posts.find((post) => post._id === editPostId);

      if (postToEdit?.codes && quillCodes.clipboard) {
        // Junta os códigos em uma única string com <pre> para formatar corretamente
        const formattedCodes = postToEdit.codes
          .map((code) => `<pre>${code}</pre>`)
          .join("<br>");

        quillCodes.clipboard.dangerouslyPasteHTML(formattedCodes);
        const length = quillCodes.getLength();
        quillCodes.setSelection(length, length); // Coloca o cursor ao final do conteúdo
      }
    }
  }, [quillCodes, editPostId, posts]);

  // Paginação
  const handlePageChange = (direction) => {
    if (loading) return;

    const newPage = direction === "next" ? page + 1 : page - 1;

    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Editar postagem (Abre o Formulário)
  const handleEdit = (post) => {
    setEditPostId(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      images: post.images,
      links: post.links,
      codes: post.codes,
    });

    if (quillContent) {
      quillContent.clipboard.dangerouslyPasteHTML(post.content);
      const length = quillContent.getLength();
      quillContent.setSelection(length, length); // Coloca o cursor ao final do conteúdo
    }

    if (quillCodes) {
      quillCodes.clipboard.dangerouslyPasteHTML(post.codes);
      const length = quillCodes.getLength();
      quillCodes.setSelection(length, length); // Coloca o cursor ao final do conteúdo
    }
  };

  // Desfazer edição
  const handleRestore = async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.10.109:5000/api/fundamentals/${id}/restore`
      );
      alert("Postagem restaurada para a versão anterior!");

      // 🔥 Substituir apenas o post restaurado
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? response.data : post))
      );
      fetchPosts(page); // Após salvar, recarregar apenas as versões atuais
    } catch (error) {
      alert("Erro ao restaurar postagem.");
    }
  };

  // Editar postagem (Salva as alterações)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://192.168.10.109:5000/api/fundamentals/${editPostId}`,
        formData
      );
      alert("Postagem atualizada!");
      setEditPostId(null);
      fetchPosts(page); // Após salvar, recarregar apenas as versões atuais
    } catch (error) {
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta postagem?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://192.168.10.109:5000/api/fundamentals/${id}`);

        const newPage = posts.length === 1 && page > 1 ? page - 1 : page;
        alert("Postagem excluída com sucesso!");
        fetchPosts(newPage);
      } catch (error) {
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
    }
    if (!formData.content.trim()) {
      alert("O conteúdo é obrigatório!");
      return false;
    }
    if (formData.images && !/^https?:\/\/.+\..+/.test(formData.images)) {
      alert("Forneça uma URL válida para a imagem.");
      return false;
    }
    return true;
  };

  // Cria uma nova postagem
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      await axios.post(`http://192.168.10.109:5000/api/fundamentals`, formData);
      alert("Nova postagem criada.");
      setShowCreateForm(false); // Fecha o formulário
      clearFormData(); // Limpa o formulário
      fetchPosts(page); // Atualiza as postagens
    } catch (error) {
      console.error("Erro ao fazer nova postagem: ", error);
      alert("Não foi possível criar essa postagem.");
    }
  };

  if (loading) {
    return <p className="loading">Carregando...</p>;
  }

  if (!posts.length && !loading) {
    return (
      <div>
        <p className="loading">Nenhuma postagem encontrada.</p>
        <FaPlus
          className="icon create-icon"
          onClick={() => setShowCreateForm(!showCreateForm)}
          title="Criar nova postagem."
        />
        {/* Formulário para criar uma nova postagem*/}
        {(showCreateForm || editPostId !== null) && (
          <form
            className="edit_form"
            onSubmit={editPostId ? handleSave : handleCreate}
          >
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              required
            />

            <label>Conteúdo:</label>
            <div ref={quillContentRef} />

            <label>Link da imagem:</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="Link da fonte da imagem"
              required
            />
            <label>Link da fonte da imagem:</label>
            <input
              type="text"
              name="links"
              value={formData.links}
              onChange={handleChange}
              placeholder="Link da fonte"
            />

            <label>Código:</label>
            <div ref={quillCodesRef} />

            <button type="submit">
              {editPostId ? "Atualizar Postagem" : "Criar Postagem"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditPostId(null);
                setShowCreateForm(false);
                clearFormData();
                quillContent.setText("");
                quillCodes.setText("");
              }}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    );
  }

  // Função para carregar conteúdo em uma janela modal com base na página
  const loadModalContent = async () => {
    try {
      const response = await fetch(
        `/desenvolvimento-web/fundamentos/fundamentos-pagina${page}.html`
      );

      // Arquivo existe
      if (response.ok) {
        const htmlContent = await response.text();
        setModalContent(htmlContent);
      } else {
        setModalContent("<p>Essa página não tem exemplo para ser exibido</p>");
      }
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar o conteúdo do modal: ", error);
      setModalContent("<p>Erro ao carregar o conteúdo do modal</p>");
      setShowModal(true);
    }
  };

  return (
    <div className="fundamentals">
      <header className="fundamentals_top">
        <h1 className="fundamentals_title">Fundamentos</h1>
        <p className="fundamentals_subtitle">
          Conteúdo relacionado aos Fundamentos do Desenvolvimento Web.
        </p>

        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </header>
      <div className="fundamentals_container">
        {error && <p className="fundamentals_error">{error}</p>}

        {!loading && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="fundamentals_card">
              <h2 className="fundamentals_card_title">{post.title}</h2>

              <div className="fundamentals_card_actions">
                {post.previousVersion && (
                  <FaUndo
                    className="icon edit-icon"
                    onClick={() => handleRestore(post._id)}
                    title="Desfazer edição?"
                  />
                )}

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
                <form
                  className="edit_form"
                  onSubmit={editPostId ? handleSave : handleCreate}
                >
                  <label>Título:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título"
                    required
                  />

                  <label>Conteúdo:</label>
                  <div ref={quillContentRef} />

                  <label>Link da imagem:</label>
                  <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="Link da fonte da imagem"
                    required
                  />
                  <label>Link da fonte da imagem:</label>
                  <input
                    type="text"
                    name="links"
                    value={formData.links}
                    onChange={handleChange}
                    placeholder="Link da fonte"
                  />

                  <label>Código:</label>
                  <div ref={quillCodesRef} />

                  <button type="submit">
                    {editPostId ? "Atualizar Postagem" : "Criar Postagem"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditPostId(null);
                      setShowCreateForm(false);
                      clearFormData();
                      quillContent.setText("");
                      quillCodes.setText("");
                    }}
                  >
                    Cancelar
                  </button>
                </form>
              )}

              <p className="fundamentals_card_date">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p
                className="fundamentals_card_content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <img
                src={post.images || "https://via.placeholder.com/150"}
                className="fundamentals_img"
                alt={post.title || "Imagem não disponível"}
              />
              <a
                href={post.links || "#"}
                className="fundamentals_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.links ? "Fonte da imagem..." : "Link não disponível"}
              </a>
              <pre
                className="fundamentals_codes"
                dangerouslySetInnerHTML={{ __html: post.codes }}
              />
              <div className="modal">
                <button className="modal-demo" onClick={loadModalContent}>
                  Demonstração
                </button>
                {showModal && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div
                        className="modal-import"
                        dangerouslySetInnerHTML={{ __html: modalContent }}
                      />
                      <button onClick={() => setShowModal(false)}>
                        <IoMdCloseCircle className="modal-close" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="loading">
            {loading ? "Carregando.. !." : "Nenhuma postagem encontrada."}
          </p>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Fundamentals;
