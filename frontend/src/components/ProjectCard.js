import React from "react";

const ProjectCard = ({ project, onClick }) => {
  if (!project) return null;

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <img src={project.image} alt={project.name} className="project-image" title={project.name} />
      <h3>{project.name}</h3>
    </div>
  );
};

export default ProjectCard;
