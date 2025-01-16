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
        <aside className={`aside ${isOpen ? "open" : "" }`}>
            <button className="menu__icon" onClick={toggleSidebar}>
                {isOpen 
                ? <MdNavigateBefore className="red" />
                : <MdNavigateNext className="green" /> }
            </button>

            <div className="nav">
                <span className="nav__logo">{isOpen ? "DiSerafim" : "DS"}</span>

                <ul className="nav__list">
                    {menuItems.map((item, index) => (
                        <li className="nav__item" key={index}>
                          {item.subMenu ? (
                            <>
                              <div className="menu__item" onClick={toggleSubMenu}>
                                <span className="icon">{item.icon}</span>
                                <span className={`menu__text ${isOpen ? "" : "hidden"}`}>{item.text}</span>

                                {isSubMenuOpen ? (
                                  <MdExpandLess className="icon" />
                                ) : (
                                  <MdExpandMore className="icon" />
                                )}
                              </div>

                              <ul className={`submenu ${isSubMenuOpen ? "submenu__open" : ""}`}>
                                {item.subMenu.map((subItem, subIndex) => (
                                  <li className="nav__item" key={subIndex}>
                                    <Link className="nav__link" to={subItem.to}>
                                      <span className="icon" title={subItem.text}>{subItem.icon}</span>
                                      <span className={`menu__text ${isOpen ? "" : "hidden"}`} title={subItem.text}>
                                        {subItem.text}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link className="nav__link" to={item.to}>
                              <span className="icon" title={item.text}>{item.icon}</span>
                              <span className={`menu__text ${isOpen ? "" : "hidden"}`} title={item.text}>{item.text}</span>
                            </Link>
                          )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
