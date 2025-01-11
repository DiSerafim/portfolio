import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdBook, MdComputer, MdDataObject, MdExpandLess, MdExpandMore, MdHome, MdNavigateBefore, MdNavigateNext, MdOutlineEngineering, MdPalette, MdWeb } from "react-icons/md";
import { FaRobot } from "react-icons/fa";

import "./Sidebar.css";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const toggleSubMenu = () => {
      setIsSubMenuOpen(!isSubMenuOpen);
    }

    const menuItems = [
        { to: "/", text: "Início", icon: <MdHome /> },
        {
          text: "Desenvolvimento Web",
          icon: <MdWeb />,
          subMenu: [
            {to: "/Developer",},
            { to: "/Fundamentals", text: "Fundamentos", icon: <MdBook />, },
            { to: "/Frontend", text: "Front-end", icon: <MdPalette />, },
            { to: "/Backend", text: "Back-end", icon: <MdDataObject />, },
            { to: "/ComputerScience", text: "Ciência da Computação", icon: <FaRobot />, },
          ],
        },
        { to: "/Ti", text: "Tecnologia da Informação", icon: <MdComputer /> },
        { to: "/Projects", text: "Projetos", icon: <MdOutlineEngineering /> },
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
                          {item.subMenu ? (
                            <>
                              <div className="menu-item" onClick={toggleSubMenu}>
                                <span className="icon">{item.icon}</span>
                                <span className={`menu-text ${isOpen ? "" : "hidden"}`}>{item.text}</span>

                                {isSubMenuOpen ? (
                                  <MdExpandLess className="icon" />
                                ) : (
                                  <MdExpandMore className="icon" />
                                )}
                              </div>
                              <ul className={`submenu ${isSubMenuOpen ? "submenu-open" : ""}`}>
                                {item.subMenu.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link to={subItem.to}>
                                      <span className="icon" title={subItem.text}>{subItem.icon}</span>
                                      <span className={`menu-text ${isOpen ? "" : "hidden"}`} title={subItem.text}>
                                        {subItem.text}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link to={item.to}>
                              <span className="icon" title={item.text}>{item.icon}</span>
                              <span className={`menu-text ${isOpen ? "" : "hidden"}`} title={item.text}>{item.text}</span>
                            </Link>
                          )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
