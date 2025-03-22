import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Lessons = () => {
  // useLocation() retorna o objeto location que representa a URL atual. Como um useState que retorna um novo location sempre que a URL muda.
  const location = useLocation();
  const { semesterNumber, subjectId } = location.state || {};

  const [subject, setSubject] = useState(null);
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
    return <div>Carregando...</div>;
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
    <div>
      {/* Topo */}
      <header>
        <span>Matéria</span>
        <h1>{subject.name}</h1>
        <span>
          <a href="Caminho de home até aqui">Caminho de home até aqui</a>{" "}
        </span>{" "}
        <br />
        <button>Criar nova aula</button>
        <button>Editar esta aula</button>
        <button>Desfazer edição desta aula</button>
        <button>Apagar esta aula</button>
      </header>

      {/* Conteúdo */}
      <div>
        <h2>Aulas</h2>
        <div>
          {currentLessons.map((lesson) => (
            <div key={lesson._id}>
              <h3>{lesson.name}</h3>
              <p>{lesson.title}</p>
              <p>{lesson.content}</p>
              <i>{lesson.date}</i>
            </div>
          ))}
        </div>
      </div>

      {/* Paginação */}
      <div>
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
