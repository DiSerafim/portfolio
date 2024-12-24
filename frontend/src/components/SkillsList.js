import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsList = () => {
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
            <h2>Meus SkillsList</h2>
            <ul>
                {projects.map(project => <li key={project.id}>{project.name}</li>)}
            </ul>
        </div>
    );
};

export default SkillsList;