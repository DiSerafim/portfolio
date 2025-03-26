import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Ti.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TI = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const navigate = useNavigate();

  // Exibe os Semestres
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ufms")
      .then((result) => {
        const sortedNumbers = result.data.sort((a, b) => a.number - b.number);
        setSemesters(sortedNumbers);

        // flatMap é útil quando tem um array de arrays e quer achatar tudo em um único array.
        const subjectList = result.data.flatMap((sem) => sem.subjects);
        setAllSubjects(subjectList);
        setSelectedSemester(null);
      })
      .catch((err) => {
        console.error("Erro ao buscar semestres:", err);
      });
  }, []);

  // Exibe as Matérias
  const fetchSubjects = (semesterNumber) => {
    axios
      .get(`http://localhost:5000/api/ufms/${semesterNumber}/subjects`)
      .then((result) => {
        setSubjects(result.data);
        setSelectedSemester(semesterNumber);
      })
      .catch((err) => {
        console.error("Erro ao buscar matérias", err);
      });
  };

  // Aulas
  const handleSubjectClick = (subjectId) => {
    navigate("/Lessons", {
      state: {
        semesterNumber: selectedSemester,
        subjectId: subjectId,
      },
    });
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

        <div className="lesson-actions">
          <FaEdit
            className="edit-btn"
            title="Editar esta aula"
            onClick={() => ""} // Chama a função de edição
          />
        </div>

        {/* Semestres */}
        <div className="semester-list">
          {semesters.map((semester) => (
            <div key={semester.number} className="semester-card">
              <h3
                className="btn-card"
                onClick={() => fetchSubjects(semester.number)}
              >
                Semestre {semester.number}
              </h3>
              <FaTrashAlt
                className="delete-btn"
                title="Apagar este semestre?"
                onClick={() => handleDeleteSemester(semester.number)} // Chama a função de exclusão
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setSelectedSemester(null)}
          className="all-subjects-btn"
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
                onClick={() => handleSubjectClick(subject._id)}
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
