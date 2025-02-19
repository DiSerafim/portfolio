import React from "react";

const ProjectCard = ({ project, onClick }) => {
    <div className="project-card" onClick={() => onClick(project)}>
        <img src={project.image} alt={project.name} />
        <h3>{project.name}</h3>
    </div>
};

export default ProjectCard;
