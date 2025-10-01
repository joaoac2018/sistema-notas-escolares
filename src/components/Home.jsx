import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bem-vindo ao Sistema de Notas</h2>
      <p>Escolha uma opção abaixo:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }}>
        <button onClick={() => navigate('/lancar-presenca')}>📋 Lançar Presença de Aula</button>
        <button onClick={() => navigate('/lancar-nota')}>📝 Lançar Nota</button>
        <button onClick={() => navigate('/alunos')}>👨‍🎓 Ver Alunos</button>
        <button onClick={() => navigate('/logout')}>🚪 Sair</button>
        <button onClick={() => navigate('/cadastro-aluno')}>📋 Cadastrar Aluno</button>
      </div>
    </div>
  );
}

export default Home;