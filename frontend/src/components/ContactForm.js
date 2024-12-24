import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name:'', email:'', message:'' });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar dados do formulário
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input type='text' value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}/>
            <label>Email:</label>
            <input type='email' value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}/>
            <label>Mensagem:</label>
            <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
            <button type='submit'>Enviar</button>
        </form>
    );
};

export default ContactForm;