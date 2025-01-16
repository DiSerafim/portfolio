import Fundamentos from "../img/fundamentos.jpg";
import FrontEnd from "../img/frontend.webp";
import BackEnd from "../img/backend.webp";
import Ciencia from "../img/ciencia.jpg";

const data = [
  {
    id: 1,
    image: Fundamentos,
    title: "Fundamentos",
    description:
      "Unix & Bash, Git, JS Basic & DOM, HTML, CSS, JS ES6, Higher Order Functions e Unit Tests, e agile.",
    span: "(agilidade, Testes Unitários, Funções de ordem superior, Unix e Bash, Git, JS Básico, DOM, HTML, CSS, JS ES6)",
  },
  {
    id: 2,
    image: FrontEnd,
    title: "Front-end",
    description:
      "Componentes, Estado e Eventos, Componentes Controlados, Ciclo de Vida, Router, Testes com RTL, Redux com React, Context API, React Hooks, metodologias ágeis e habilidades comportamentais.",
    span: "(front-end, react, redux com react, context api, react hooks, router, soft skills)",
  },
  {
    id: 3,
    image: BackEnd,
    title: "Back-end",
    description:
      "Banco de Dados SQL, NoSQL, Node e Express.js, MVC, API, REST, JWT e File Upload, SOLID, ORM, Sockets, deploy com Heroku, metodologias ágeis e habilidades comportamentais.",
    span: "(backend, banco de dados, sql, nosql, solid, orm, sockets, heroku, rest)",
  },
  {
    id: 4,
    image: Ciencia,
    title: "Ciência da Computação",
    description:
      "Ciência da Computação, incluindo Python e OOP, Algoritmos e Complexidade, Estrutura de Dados e Resolução de Problemas, metodologias ágeis e habilidades comportamentais.",
    span: "(python, oop, algoritmos, dados, metodologia ágil, soft skills)",
  },
];

export default data;
