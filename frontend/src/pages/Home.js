import React from "react";
import {
  FaCss3,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinkedinIn,
  FaNodeJs,
  FaReact,
  FaWhatsapp,
} from "react-icons/fa";
import { SiGmail, SiMongodb, SiPostman } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import "./Home.css";
import data from "../components/data";

const Home = () => {
  return (
    <section className="home container">
      <div className="intro">
        <img
          src="https://avatars.githubusercontent.com/u/39680650?v=4"
          className="home_img"
          alt="Diego Serafim de Sousa"
          title="Diego Serafim de Sousa, perfil"
        />
        <h2 className="home_name">Diego Serafim de Sousa</h2>

        <div className="home_socials">
          <a
            href="https://github.com/DiSerafim"
            className="home_social-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/diserafim/"
            className="home_social-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Linkedin"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="mailto:diegoserafim1@gmail.com"
            className="home_social-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Gmail"
          >
            <SiGmail />
          </a>
          <a
            href="https://wa.me/5511916178416"
            className="home_social-link"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>

        <span className="home_education">Desenvolvedor Web</span>
        <div className="home_skils">
          <FaReact alt="ReactJs" title="React" className="home_icon" />
          <FaNodeJs alt="NodeJs" title="NodeJs" className="home_icon" />
          <FaGit alt="Git" title="Git" className="home_icon" />
          <FaHtml5 alt="Html" title="Html" className="home_icon" />
          <FaCss3 alt="CSS" title="CSS" className="home_icon" />
          <SiMongodb alt="Mongo" title="MongoDB" className="home_icon" />
          <IoLogoJavascript
            alt="Javascript"
            title="Javascript"
            className="home_icon"
          />
          <SiPostman alt="Postman" title="Postman" className="home_icon" />
        </div>
      </div>

      <div className="about_container">
        <h3 className="about_title">Bem-vindo ao Meu Portfólio</h3>
        <p className="about_title_info">
          Este espaço é dedicado a apresentar meus projetos e estudos
          desenvolvidos ao longo da minha trajetória acadêmica e profissional.
        </p>

        <div className="about_info">
          <p className="about_description">
            Estudante de Tecnologia da Informação pela{" "}
            <a
              href="https://www.ufms.br/"
              target="_blank"
              rel="noopener noreferrer"
              title="UFMS"
            >
              UFMS
            </a>
            . De 03/2023 a 2025.
          </p>
          <span className="about_description_info">
            Curso Superior de Tecnologia da Informação
          </span>
          <span className="about_description_info">2400 Horas</span>
          <span className="about_description_info">6 Semestres</span>
        </div>

        <div className="about_info">
          <p className="about_description">
            Formado em desenvolvimento web pela{" "}
            <a
              href="https://betrybe.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Trybe"
            >
              Trybe
            </a>
            . De 02/2021 a 03/2022.
          </p>
          <span className="about_description_info">
            Com mais de 1500 horas de formação que aborda conteúdos relacionados
            a fundamentos de desenvolvimento web, desenvolvimento Front-end,
            desenvolvimento Back-end, ciência da computação, engenharia de
            software, metodologias ágeis e habilidades comportamentais.
          </span>
        </div>
      </div>

      <div className="services container section">
        <h3 className="section_title">Desenvolvimento Web</h3>

        <div className="services_container grid">
          {data.map(({ id, image, title, description, span, link }) => {
            return (
              <a href={link}>
                <div className="services_card" key={id} title={span}>
                  <img src={image} alt="title" className="services_img" />
                  <h3 className="services_title">{title}</h3>
                  <p className="services_description">{description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <footer className="footer">
        <div className="footer_container">
          <p>
            &copy; {new Date().getFullYear()} Diego Serafim de Sousa • Todos os
            direitos reservados.
          </p>

          <div className="footer_socials">
            <a
              href="https://github.com/DiSerafim"
              className="home_social-link"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/diserafim/"
              className="home_social-link"
              target="_blank"
              rel="noopener noreferrer"
              title="Linkedin"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:diegoserafim1@gmail.com"
              className="home_social-link"
              target="_blank"
              rel="noopener noreferrer"
              title="Gmail"
            >
              <SiGmail />
            </a>
            <a
              href="https://wa.me/5511916178416"
              className="home_social-link"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;
