import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Ti.css";

const TI = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const navigate = useNavigate();

  // Semestres
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

  // Matérias
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
    navigate(`/api/ufms/${selectedSemester}/subjects/${subjectId}`);
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">Tecnologia da Informação</h1>
        <p className="subtitle">Gestão de Aulas - UFMS</p>

        {/* Semestres */}
        <div className="semester-list">
          {semesters.map((semester) => (
            <div
              key={semester.number}
              onClick={() => fetchSubjects(semester.number)}
            >
              <h3 className="btn-card">Semestre {semester.number}</h3>
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
