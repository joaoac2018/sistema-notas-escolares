import React, { useState } from 'react';
import './Secretaria.css';

function Secretaria() {
  const [busca, setBusca] = useState('');
  const [resultado, setResultado] = useState(null);

  const alunosMock = [
    {
      nome: 'Carlos Mendes',
      matricula: '2023001',
      turma: '3º Ano A',
      nascimento: '12/03/2007',
      documentos: ['Histórico Escolar', 'Declaração de Matrícula'],
    },
  ];

  const handleBuscar = () => {
    const resultadoBusca = alunosMock.find(
      (aluno) =>
        aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
        aluno.matricula === busca
    );
    setResultado(resultadoBusca || null);
  };

  return (
    <div className="secretaria-container">
      <h2>Área Administrativa - Secretaria</h2>
      <div className="secretaria-form">
        <label>
          Buscar aluno por nome ou matrícula:
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex: Carlos Mendes ou 2023001"
          />
        </label>
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {resultado ? (
        <div className="secretaria-dados">
          <h3>Dados do Aluno</h3>
          <p><strong>Nome:</strong> {resultado.nome}</p>
          <p><strong>Matrícula:</strong> {resultado.matricula}</p>
          <p><strong>Turma:</strong> {resultado.turma}</p>
          <p><strong>Nascimento:</strong> {resultado.nascimento}</p>
          <p><strong>Documentos:</strong></p>
          <ul>
            {resultado.documentos.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      ) : busca ? (
        <p className="nao-encontrado">Aluno não encontrado.</p>
      ) : null}
    </div>
  );
}

export default Secretaria;