import React, { useState } from 'react';
import './ConsultarAluno.css';

function ConsultarAluno() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [dadosAluno, setDadosAluno] = useState(null);

  const alunosMock = [
    {
      nome: 'Maria Silva',
      nota: 6.5,
      presenca: '85%',
      situacao: 'Recuperação',
    },
    {
      nome: 'João Souza',
      nota: 8.2,
      presenca: '92%',
      situacao: 'Aprovado',
    },
    {
      nome: 'Ana Costa',
      nota: 4.3,
      presenca: '70%',
      situacao: 'Reprovado',
    },
  ];

  const handleBuscar = () => {
    const resultado = alunosMock.find(
      (aluno) => aluno.nome.toLowerCase() === nomeAluno.toLowerCase()
    );
    setDadosAluno(resultado || null);
  };

  return (
    <div className="consultar-container">
      <h2>Consultar Aluno</h2>
      <div className="consultar-form">
        <label>
          Nome do Aluno:
          <input
            type="text"
            value={nomeAluno}
            onChange={(e) => setNomeAluno(e.target.value)}
            placeholder="Digite o nome completo"
          />
        </label>
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {dadosAluno ? (
        <div className="resultado">
          <h3>Dados do Aluno</h3>
          <p><strong>Nome:</strong> {dadosAluno.nome}</p>
          <p><strong>Nota:</strong> {dadosAluno.nota}</p>
          <p><strong>Presença:</strong> {dadosAluno.presenca}</p>
          <p><strong>Situação:</strong> {dadosAluno.situacao}</p>
        </div>
      ) : nomeAluno ? (
        <p className="nao-encontrado">Aluno não encontrado.</p>
      ) : null}
    </div>
  );
}

export default ConsultarAluno;