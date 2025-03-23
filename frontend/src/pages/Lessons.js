import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Lessons.css";

const Lessons = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    name: "",
    title: "",
    content: "",
  });

  // useLocation() retorna o objeto location que representa a URL atual. Como um useState que retorna um novo location sempre que a URL muda.
  const location = useLocation();
  const { semesterNumber, subjectId } = location.state || {};

  const [subject, setSubject] = useState(null);
  const [subjectName, setSubjectName] = useState(
    location.state?.subjectName || ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  const page = 1; // Páginas visíveis

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

      setShowForm(false);
      setNewLesson({ name: "", title: "", content: "" });
    } catch (error) {
      console.error(
        "Erro ao criar aula: ",
        error.response ? error.response.data : error.message
      );
      alert("Erro ao criar aula. Tente novamente.");
    }
  };

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
        <form className="lesson-form" onSubmit={handleCreateLesson}>
          <h2>Criar nova aula</h2>

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

          <textarea
            placeholder="Conteúdo da matéria"
            value={newLesson.content}
            onChange={(e) =>
              setNewLesson({ ...newLesson, content: e.target.value })
            }
            required
          ></textarea>

          <button type="submit" className="save-btn">
            Salvar Aula
          </button>
        </form>
      )}

      {/* Conteúdo */}
      <div className="lesson-list">
        {currentLessons.map((lesson) => (
          <div className="lesson-card" key={lesson._id}>
            <h3>{lesson.name}</h3>
            <p>{lesson.title}</p>
            <p>{lesson.content}</p>
            <i>{new Date(lesson.date).toLocaleDateString()}</i>

            <div className="lesson-actions">
              <button className="edit-btn">Editar esta aula</button>
              <button className="delete-btn">Desfazer edição desta aula</button>
              <button className="undo-btn">Apagar esta aula</button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
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
