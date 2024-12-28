import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdComputer, MdContactMail, MdHome, MdMultipleStop, MdNavigateBefore, MdNavigateNext, MdPerson, MdWeb } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const menuItems = [
        { to: "/", text: "Início", icon: <MdHome /> },
        { to: "/About", text: "Sobre mim", icon: <MdPerson /> },
        { to: "/Contact", text: "Contato", icon: <MdContactMail /> },
        { to: "/WebDev", text: "Desenvolvimento Web", icon: <MdWeb /> },
        { to: "/Ti", text: "Tecnologia da Informação", icon: <MdComputer /> },
    ];

    return (
        <nav className={`navbar ${isOpen ? "open" : "" }`}>
            <button className="menu-icon" onClick={toggleSidebar}>
                {isOpen 
                ? <MdNavigateBefore className="red" />
                : <MdNavigateNext className="green" /> }
            </button>

            <div className="sidebar">
                <span className="sidebar-title">{isOpen ? "DiSerafim" : "DS"}</span>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.to}>
                                <span className="icon" title={item.text}>{item.icon}</span>
                                {isOpen && <span className="menu-text">{item.text}</span>}
                                
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
