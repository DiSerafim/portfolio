import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/projects')
            .then(response => {
                setProjects(response.data.projects);
            })
            .catch(error => console.error('Erro ao buscar projetos', error));
    }, []);

    return (
        <div>
            <h2>Meus Projetos</h2>
            <ul>
                {projects.map(project => (
                    <div key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <img src={project.imageUrl} alt={project.name} />
                        <a href={project.link} target='_blank' rel='noopener noreferrer'>Ver Projeto</a>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;