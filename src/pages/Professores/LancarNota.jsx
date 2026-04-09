import React, { useState, useEffect } from 'react';
import { lancarNota } from './notaservice';
import { buscarAlunosPorNome } from '../../services/alunoService';
import './LancarNota.css';

function LancarNotas() {
  const [nomealuno, setNomeAluno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [turma, setTurma] = useState('');
  const [nota, setNota] = useState('');
  const [alunoBusca, setAlunoBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);


  useEffect(() => {
  const buscar = async () => {
    if (alunoBusca.length > 1) {
      const resultados = await buscarAlunosPorNome(alunoBusca);
      setSugestoes(resultados);
    } else {
      setSugestoes([]);
    }
};
  buscar();
}, [alunoBusca]);

  const handleSubmit = async(e) => {
    e.preventDefault();
     const dados = { nomealuno, disciplina, turma, nota };
      try {
        await lancarNota(dados);
        alert('Nota lançada com sucesso!');
        setNomeAluno('');
        setDisciplina('');
        setTurma('');
        setNota('');
      } catch (err) {
        alert('Erro ao lançar nota');
      }
  };

  const selecionarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
    setNomeAluno(aluno.nome); // já preenche o campo do formulário
    setTurma(aluno.turma);    // já preenche a turma
  };

 

  return (
    <div className="lancar-notas-container">
      <h2>Lançar Notas</h2>

      <div className="painel-container">
        
        {/* Painel Pesquisar Aluno */}
        <div className="painel painel-pesquisar">
          <h3>Pesquisar Aluno</h3>
          <input
            type="text"
            placeholder="Digite o nome do aluno"
            value={alunoBusca}
            onChange={(e) => setAlunoBusca(e.target.value)}
          />
          <ul className="sugestoes-lista">
            {sugestoes.map((aluno, index) => (
              <li key={index} onClick={() => selecionarAluno(aluno)}>
                {aluno.nome}
              </li>
            ))}
          </ul>
        </div>

        {/* Painel Informações do Aluno */}
        <div className="painel painel-info">
          <h3>Informações do Aluno</h3>
          {alunoSelecionado ? (
            <div>
              <p><strong>Nome:</strong> {alunoSelecionado.nome}</p>
              <p><strong>Série/Turma:</strong> {alunoSelecionado.turma}</p>
              <p><strong>Matérias:</strong></p>
              <ul>
                {alunoSelecionado.materias?.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Nenhum aluno selecionado.</p>
          )}
        </div>
        
          {/* Painel Planilha de Disciplinas */}
<div className="painel painel-planilha">
  <h3>Disciplinas e Notas</h3>
  <table className="tabela-disciplinas">
    <thead>
      <tr>
        <th>Disciplina</th>
        <th>Nota</th>
      </tr>
    </thead>
    <tbody>
      {alunoSelecionado?.materias?.map((materia, index) => (
        <tr key={index}>
          <td>{materia}</td>
          <td>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Digite a nota"
              onChange={(e) => {
                // Aqui você pode salvar a nota em um objeto state
                // Exemplo: setNotas({...notas, [materia]: e.target.value})
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button className="btn-salvar">Salvar Notas</button>
</div>
      </div>

      {/* Formulário de lançamento de nota */}
      <form onSubmit={handleSubmit} className="lancar-notas-form">
        <label>
          Nome do Aluno:
          <input
            type="text"
            value={nomealuno}
            onChange={(e) => setNomeAluno(e.target.value)}
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
          Turma:
          <input
            type="text"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            required
          />
        </label>

        <label>
          Nota:
          <input
            type="number"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </label>
        <button type="submit">Lançar Nota</button>
      </form>
    </div>
  );
}


export default LancarNotas;