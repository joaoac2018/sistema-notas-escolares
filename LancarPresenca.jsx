/*import React, { useState } from 'react';
import './LancarPresenca.css';

function LancarPresenca() {
  const [professor, setProfessor] = useState('');
  const [turma, setTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [aluno, setAluno] = useState('');
  const [presenca, setPresenca] = useState('Presente');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ professor, turma, disciplina, aluno, presenca });
    alert('Presença lançada com sucesso!');
    setProfessor('');
    setTurma('');
    setDisciplina('');
    setAluno('');
    setPresenca('Presente');
  };

  return (
    <div className="lancar-presenca-container">
      <h2>Lançar Presença</h2>
      <form onSubmit={handleSubmit} className="lancar-presenca-form">
        <label>
          Professor:
          <input
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
          />
        </label>

        <label>
          Turma:
          <input
            type="text"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            required
          />
        </label>

        <label>
          Disciplina:
          <input
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
          />
        </label>

        <label>
          Aluno:
          <input
            type="text"
            value={aluno}
            onChange={(e) => setAluno(e.target.value)}
            required
          />
        </label>

        <label>
          Presença:
          <select
            value={presenca}
            onChange={(e) => setPresenca(e.target.value)}
            required
          >
            <option value="Presente">Presente</option>
            <option value="Ausente">Ausente</option>
            <option value="Justificado">Justificado</option>
          </select>
        </label>

        <button type="submit">Lançar Presença</button>
      </form>
    </div>
  );
}

export default LancarPresenca;*/