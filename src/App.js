import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Sidebar from './components/Sidebar';
import Home from './pages/Home/Home';
import CadastroAluno from './pages/CadastroAluno/CadastroAluno';
import LancarNotasProfessor from './pages/Professores/LancarNota';
import LancarPresenca from './pages/Professores/LancarPresenca';
import ConsultarAluno from './pages/Professores/ConsultarAluno';
import Secretaria from './pages/Secretaria/Secretaria';
import MatricularAcoes from './pages/Secretaria/MatricularAcoes';
import ProfessorGestao from './pages/Secretaria/ProfessorGestao';
import TurmaGestao from './pages/Secretaria/TurmaGestao';
 // ajuste o caminho conforme necessário

function App() {
  const location = useLocation();
  const rotasSemSidebar = ['/', '/login'];
  const mostrarSidebar = !rotasSemSidebar.includes(location.pathname)

  return (
      <div style={{ display: 'flex'}}>
        {mostrarSidebar && <Sidebar />}
        <Routes> 
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-aluno" element={<CadastroAluno />} />
          <Route path="/alunos/lancar-presenca" element={<LancarPresenca />} />
          <Route path="/professores/lancar-nota" element={<LancarNotasProfessor />} />
          <Route path='/professores/lancar-presenca' element={<LancarPresenca />} />
          <Route path='/professores/consultar' element={<ConsultarAluno />} />
          <Route path='/secretaria' element={<Secretaria/>} />
          <Route path='/secretaria/professores' element={<ProfessorGestao/>} />
          <Route path="/secretaria/matriculas" element={<MatricularAcoes />} />        
          <Route path="/secretaria/turmas" element={<TurmaGestao />} />
        </Routes>
      </div>
  );
}

export default App;
