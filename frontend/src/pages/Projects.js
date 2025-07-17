import React, { useState } from "react";
import dataProjects from "./../components/dataProjects";
import ProjectCard from "./../components/ProjectCard";
import "./Projects.css";
import Footer from "../components/Footer";

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
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedProject(null);
            }}
            className={selectedCategory === category ? "active" : ""}
          >
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
            className="miniature"
          />
        ))}
      </div>

      {selectedProject && (
        <div className="project-details">
          <h2>{selectedProject.name}</h2>
          <p>{selectedProject.category}</p>

          <div className="project-incorpored">
            <iframe
              src={selectedProject.url}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="selectedProject.name"
            ></iframe>
          </div>
        </div>
      )}
    <Footer />
    </div>
  );
};

export default Projects;
