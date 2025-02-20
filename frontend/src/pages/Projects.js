import React, { useState } from "react";
import dataProjects from "./../components/dataProjects";
import ProjectCard from "./../components/ProjectCard";
import Modal from "./../components/ModalMiniProjects";
import "./Projects.css";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    "Todos",
    "Fundamentos Dev Web",
    "Front-end",
    "Back-end",
    "Ciência da Computação",
  ];

  const filteredProjects =
    selectedCategory === "Todos"
      ? dataProjects
      : dataProjects.filter((project) => project.category === selectedCategory);

  return (
    <div className="page-container">
      <h1>Projetos</h1>
      <p>Visão geral de todos os projetos desenvolvidos.</p>

      <nav>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </nav>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={setSelectedProject}
          />
        ))}
      </div>

      <Modal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
