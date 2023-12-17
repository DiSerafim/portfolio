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
                {projects.map(project => <li key={project.id}>{project.name}</li>)}
            </ul>
        </div>
    );
};

export default ProjectList;