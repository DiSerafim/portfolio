import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./Ti.css";
import { FaTrashAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

const TI = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    name: "",
    title: "",
    content: "",
  });
  const [formData, setFormData] = useState({
    semesterNumber: "",
    subjectName: "",
  });
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigate = useNavigate();

  // Editor Quill
  const theme = "snow";
  const { quill, quillRef } = useQuill({
    placeholder: "Conteúdo da matéria",
    theme,
  });

  // Exibe os Semestres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/ufms");
        const sortedNumbers = result.data.sort((a, b) => a.number - b.number);
        setSemesters(sortedNumbers);

        // flatMap é útil quando tem um array de arrays e quer achatar tudo em um único array.
        setAllSubjects(result.data.flatMap((sem) => sem.subjects));

        if (selectedSemester) {
          const res = await axios.get(
            `http://localhost:5000/api/ufms/${selectedSemester}/subjects`
          );
          setSubjects(res.data);
        }
      }catch(err) {
        console.error("Erro ao buscar semestres:", err);
      }
    };
    fetchData();
  }, [forceUpdate, selectedSemester]);

  // Navega para aulas
  const handleSubjectClick = (subject) => {
    navigate("/Lessons", {
      state: {
        semesterNumber: selectedSemester,
        subjectId: subject._id,
        subjectName: subject.name,
        lessons: subject.lessons,
      },
    });
  };

  // Sincroniza o conteúdo do Quill com o estado
  useEffect(() => {
    if (quill) {
      const handler = () => {
        setNewLesson((prev) => ({
          ...prev,
          content: quill.root.innerHTML,
        }));
      };

      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill]);

  // Cria nova aula
  const handleCreateLesson = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!quill) {
        alert("Editor de conteúdo não carregado!");
        return;
      }

      const content = quill?.root?.innerHTML;

      if (
        !formData.semesterNumber ||
        !formData.subjectName.trim() ||
        !newLesson.name.trim() ||
        !newLesson.title.trim() ||
        !content.trim()
      ) {
        alert("Todos os campos são obrigatórios!");
        return;
      }

      const lessonData = {
        semesterNumber: parseInt(formData.semesterNumber, 10),
        subjectName: formData.subjectName,
        name: newLesson.name,
        title: newLesson.title,
        content,
      };
      const response = await axios.post(
        "http://localhost:5000/api/ufms/lessons",
        lessonData
      );
      if (response.status === 201) {
        alert("Aula criada com sucesso!");
        resetForm();
        setForceUpdate((prev) => !prev);
      }
    } catch (error) {
      console.error("Erro ao criar aula: ", error.response?.data || error);
      alert(
        `Erro ao criar aula: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setNewLesson({ name: "", title: "", content: "" });
    setFormData({ semesterNumber: "", subjectName: "" });
    if (quill) quill.setText("");
  };

  // Deleta semestre
  const handleDeleteSemester = async (semesterNumber) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este semestre?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/ufms/${semesterNumber}`);
      setSemesters((prevSemesters) =>
        prevSemesters.filter((sem) => sem.number !== semesterNumber)
      );
    } catch (error) {
      console.error("Erro ao deletar semestre: ", error);
      alert("Erro ao deletar semestre. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">Tecnologia da Informação</h1>
        <p className="subtitle">Gestão de Aulas - UFMS</p>

        {/* Chama a função para criar nova aula */}
        <div className="lesson-actions" onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            "Fechar Formulário"
          ) : (
            <IoAdd className="icon" title="Criar nova aula" />
          )}
        </div>

        {showForm && (
          <form className="lesson-form" onSubmit={handleCreateLesson}>
            <div className="form-group">
              <input
                type="number"
                placeholder="Semestre n°"
                value={formData.semesterNumber}
                onChange={(e) =>
                  setFormData({ ...formData, semesterNumber: e.target.value })
                }
                required
                min="1"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nome da Matéria"
                value={formData.subjectName}
                onChange={(e) =>
                  setFormData({ ...formData, subjectName: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Título da aula"
                value={newLesson.title}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, title: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subtitulo da aula"
                value={newLesson.name}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, name: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <div ref={quillRef} />
            </div>

            <div className="form-action">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Salvando..." : "Criar aula"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Semestres */}
        <div className="semester-list">
          {semesters.map((semester) => (
            <div key={semester.number} className="semester-card">
              <h3
                className="btn-card"
                onClick={() => !loading && setSelectedSemester(semester.number)}
              >
                Semestre {semester.number}
              </h3>
              <FaTrashAlt
                className="delete-btn"
                title="Apagar este semestre?"
                onClick={() => !loading && handleDeleteSemester(semester.number)} // Chama a função de exclusão
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setSelectedSemester(null)}
          className="all-subjects-btn"
          disabled={loading}
        >
          Todos
        </button>
      </header>

      {/* Todas Matérias */}
      {!selectedSemester && (
        <div>
          <h2 className="subtitle">Todas Matérias</h2>
          <div className="subject-list">
            {allSubjects.map((subject) => (
              <div
                key={subject._id}
                onClick={() => handleSubjectClick(subject._id)}
                className="card"
              >
                <h3>{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aulas */}
      {selectedSemester && (
        <div>
          <h2 className="subtitle">Semestre {selectedSemester}</h2>
          <div className="subject-list">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                onClick={() => handleSubjectClick(subject)}
                className="card"
              >
                <h3>{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TI;
