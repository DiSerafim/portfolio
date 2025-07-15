import React from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./Footer.css";

const Footer = () => {
  return (
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
  );
};

export default Footer;
