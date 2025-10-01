import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import CadastroAluno from './components/CadastroAluno';
import LancarNota from './components/LancarNota';
import Home from './components/Home';
import LancarPresenca from './components/LancarPresenca';
 // ajuste o caminho conforme necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro-aluno" element={<CadastroAluno />} />
        <Route path="/lancar-nota" element={<LancarNota />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/lancar-presenca" element={<LancarPresenca/>}/>
        {/* Futuras rotas:
        
        */}
      </Routes>
    </Router>
  );
}

export default App;
