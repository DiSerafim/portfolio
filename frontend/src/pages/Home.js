import React from "react";

const Home = () => {
    return(
        <div className="page-container">
            <h1>Bem-vindo ao Meu Portfólio</h1>
            <p>Explore os projetos e estudos desenvolvidos ao longo da minha trajetória acadêmica e profissional.</p>
            <hr />
            <ul><li>Contato e sobre mim, serão incluídos na página de apresentação home</li></ul>
            <div className="page-container">
                <h1>Sobre Mim</h1>
                <p>Sou estudante de Tecnologia da Informação pela UFMS, apaixonado por desenvolvimento web e inovação tecnológica.</p>
            </div>
            <hr />
            <div className="page-container">
                <h1>Contato</h1>
                <p>Email: seuemail@example.com</p>
                <p>Telefone: (99) 99999-9999</p>
            </div>
        </div>
    );
}

export default Home;