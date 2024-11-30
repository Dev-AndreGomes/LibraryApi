import React from "react";
import { NavLink } from "react-router-dom";
import { FaBook, FaUsers, FaBookmark, FaChartBar, FaUndo } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="header">
          <FaBook className="icon-header" />
          <span className="title">LibraryAPI</span>
        </div>
        <hr className="divider" />

        <ul className="menu">
          <li className="menu-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "menu-button active" : "menu-button")}>
              <FaBook className="icon" />
              Livros
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/pessoas" className={({ isActive }) => (isActive ? "menu-button active" : "menu-button")}>
              <FaUsers className="icon" />
              Pessoas
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/emprestimos" className={({ isActive }) => (isActive ? "menu-button active" : "menu-button")}>
              <FaBookmark className="icon" />
              Empréstimos
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/devolucoes" className={({ isActive }) => (isActive ? "menu-button active" : "menu-button")}>
              <FaUndo className="icon" />
              Devoluções
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/relatorios" className={({ isActive }) => (isActive ? "menu-button active" : "menu-button")}>
              <FaChartBar className="icon" />
              Relatórios
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
