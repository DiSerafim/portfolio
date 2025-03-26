import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./Lessons.css";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";

const Lessons = () => {
  const navigate = useNavigate();
  // useLocation() retorna o objeto location que representa a URL atual. Como um useState que retorna um novo location sempre que a URL muda.
  const location = useLocation();
  const { semesterNumber, subjectId } = location.state || {}; // Número do semestre e Id da matéria

  const [showForm, setShowForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    name: "",
    title: "",
    content: "",
  });
  const [subject, setSubject] = useState(null);
  const [subjectName, setSubjectName] = useState(
    location.state?.subjectName || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [editLesson, setEditLesson] = useState(null);

  // Editor Quill
  const theme = "snow";
  const { quill, quillRef } = useQuill({
    placeholder: "Conteúdo da matéria",
    theme,
  });

  // Páginas visíveis
  const page = 1;

  useEffect(() => {
    if (semesterNumber && subjectId) {
      axios
        .get(
          `http://localhost:5000/api/ufms/${semesterNumber}/subjects/${subjectId}`
        )
        .then((res) => {
          setSubject(res.data);
        })
        .catch((err) => {
          console.error("Erro ao buscar matéria: ", err);
        });
    }
  }, [semesterNumber, subjectId]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setNewLesson((prev) => ({
          ...prev,
          content: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  // Criar aula
  const handleCreateLesson = async (e) => {
    e.preventDefault();

    if (
      !newLesson.name ||
      !newLesson.title ||
      !newLesson.content ||
      !subjectName
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/ufms/lessons", {
        semesterNumber,
        subjectName,
        name: newLesson.name,
        title: newLesson.title,
        content: newLesson.content,
      });

      setSubject((prevSubject) => ({
        ...prevSubject,
        lessons: [...prevSubject.lessons, res.data],
      }));

      resetForm();
    } catch (error) {
      console.error(
        "Erro ao criar aula: ",
        error.response ? error.response.data : error.message
      );
      alert("Erro ao criar aula. Tente novamente.");
    }
  };

  // Atualizar aula
  const handleUpdateLesson = async (e) => {
    e.preventDefault();

    if (
      !newLesson.name ||
      !newLesson.title ||
      !newLesson.content ||
      !subjectName
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/ufms/${semesterNumber}/subjects/${subjectId}/lessons/${editLesson._id}`,
        {
          name: newLesson.name,
          title: newLesson.title,
          content: newLesson.content,
        }
      );

      setSubject((prevSubject) => ({
        ...prevSubject,
        lessons: prevSubject.lessons.map((lesson) =>
          lesson._id === editLesson._id ? response.data.lesson : lesson
        ),
      }));
      resetForm();
    } catch (error) {
      console.error("Erro ao atualizar aula: ", error);
      alert("Erro ao atualizar aula. Tente novamente.");
    }
  };

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setNewLesson({
      name: lesson.name,
      title: lesson.title,
      content: lesson.content,
    });

    // setTimeout() para agendar uma função ou um pedaço de código para ser executado após um atraso especificado
    setTimeout(() => {
      if (quill) {
        quill.setText(""); // Limpa o editor antes de preencher
        quill.clipboard.dangerouslyPasteHTML(lesson.content); // Preenche com o conteúdo da aula
      }
    }, 0);
    setShowForm(true); // Abre o formulário para edição
  };

  const resetForm = () => {
    setShowForm(false);
    setNewLesson({ name: "", title: "", content: "" });
    quill.setText(""); // limpa o editor
    setEditLesson(null);
  };

  // Caso o editor esteja vazio, preenche com o conteúdo da nova aula
  useEffect(() => {
    if (quill && editLesson) {
      quill.clipboard.dangerouslyPasteHTML(newLesson.content);
    }
  }, [quill, editLesson, newLesson.content]);

  if (!subject) {
    return <div className="loading">Carregando...</div>;
  }

  /* ---------- Paginação ---------- */
  const indexOfLastLesson = currentPage * page;
  const indexOfFirstLesson = indexOfLastLesson - page;
  // slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim
  const currentLessons = subject.lessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );
  // Math.ceil(x) retorna o menor número inteiro maior ou igual a "x".
  const totalPages = Math.ceil(subject.lessons.length / page);

  return (
    <div className="lesson-container">
      {/* Topo */}
      <header className="lesson-header">
        <h1>{subject.name}</h1>
        <div className="header-buttons">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button
            className="toggle-form-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Fechar" : "Criar nova aula"}
          </button>
        </div>
      </header>

      {/* Formulário */}
      {showForm && (
        <form
          className="lesson-form"
          onSubmit={editLesson ? handleUpdateLesson : handleCreateLesson}
        >
          <h2>{editLesson ? "Editar aula" : "Criar nova aula"}</h2>

          <input
            type="text"
            name="semesterNumber"
            placeholder="Semestre"
            value={semesterNumber}
            readOnly
          />

          <input
            type="text"
            name="subjectName"
            placeholder="Matéria"
            value={subjectName}
            readOnly={!!location.state?.subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Título da matéria"
            value={newLesson.name}
            onChange={(e) =>
              setNewLesson({ ...newLesson, name: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Descrição da matéria"
            value={newLesson.title}
            onChange={(e) =>
              setNewLesson({ ...newLesson, title: e.target.value })
            }
            required
          />

          <div ref={quillRef} />

          <button type="submit" className="save-btn">
            {editLesson ? "Salvar edições" : "Salvar Aula"}
          </button>
        </form>
      )}

      {/* Conteúdo */}
      <div className="lesson-list">
        {currentLessons.map((lesson) => (
          <div className="lesson-card" key={lesson._id}>
            <h3>{lesson.name}</h3>
            <p>{lesson.title}</p>
            <div className="lesson-actions">
              <i>{new Date(lesson.date).toLocaleDateString()}</i>
              <FaEdit
                className="edit-btn"
                title="Editar esta aula"
                onClick={() => handleEditLesson(lesson)} // Chama a função de edição
              />
              <FaUndo className="undo-btn" title="Desfazer edição desta aula" />
              <FaTrash className="delete-btn" title="Apagar esta aula" />
            </div>

            {/* Paginação Top*/}
            <div className="pagination-top">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>
              <span>
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
            <p dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        ))}
      </div>

      {/* Paginação bottom */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        <span>
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Lessons;
