import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaClipboardList,
  FaEdit,
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaFileAlt, 
  FaChalkboard,
  FaListUl
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [professorOpen, setProfessorOpen] = useState(false);
  const [alunoOpen, setAlunoOpen] = useState(false);
  const [secretariaOpen, setSecretariaOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="menu-list">
         {/* Inicio */}
        <li>
          <Link to="/home" className="menu-item">
            <FaHome className="icon" /> <span>Início</span>
          </Link>
        </li>

        {/* Alunos */}
       <li onClick={() => setAlunoOpen(!alunoOpen)} className="menu-item">
          <FaUserGraduate className="icon" /> <span>Alunos</span>
        </li>
        {alunoOpen && (
        <ul className="submenu-list">
        <li>
          <Link to="/alunos/consultarAluno" className="submenu-item">
            <FaEye className="icon" /> Ver Situação do Aluno
          </Link>
        </li>
      </ul>
    )}

        {/* Professores */}
        <li onClick={() => setProfessorOpen(!professorOpen)} className="menu-item">
          <FaChalkboardTeacher className="icon" /> <span>Professores</span>
        </li>
        {professorOpen && (
          <ul className="submenu-list">
            <li>
              <Link to="/Professores/lancar-nota" className="submenu-item">
                <FaEdit className="icon" /> Lançar Notas
              </Link>
            </li>
            <li>
              <Link to="/professores/lancar-presenca" className="submenu-item">
                <FaCalendarAlt className="icon" /> Lançar Presença
              </Link>
            </li>
            <li>
              <Link to="/professores/consultar" className="submenu-item">
                <FaSearch className="icon" /> Consultar Aluno
              </Link>
            </li>
          </ul>
        )}

        {/* Secretaria */}
        <li onClick={() =>setSecretariaOpen(!secretariaOpen)} className='menu-item'>
            <FaBuilding className="icon" /> <span>Secretaria</span>
        </li>
        {secretariaOpen && (
          <ul className="submenu-list">
            <li>
              <Link to="/secretaria" className="submenu-item">
                <FaSearch className="icon" /> consultar dados do aluno
              </Link>
            </li>
            <li>
              <Link to="/secretaria/professores" className="submenu-item">
                <FaChalkboard className="icon" /> Professores
            </Link>
            </li>
            <li>
              <Link to="secretaria/turmas" className="submenu-item">
               <FaClipboardList className="icon" /> Turmas 
              </Link>
            </li>
            <li>
              <Link to="secretaria/matriculas" className="submenu-item">
               <FaFileAlt className="icon" /> Matriculas
              </Link>
            </li>
          </ul>  
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;