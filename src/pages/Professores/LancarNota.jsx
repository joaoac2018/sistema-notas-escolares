import React, { useState, useEffect } from 'react';
import { lancarNota } from './notaservice';
import { buscarAlunosPorNome } from '../../services/alunoService';
import './LancarNota.css';

function LancarNotas() {
  const [alunoBusca, setAlunoBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [notas, setNotas] = useState('');


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

  const selecionarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
    setNotas({}); // limpa notas ao trocar de aluno
  };

  const handleNotaChange = (materia, bimestre, valor) => {
    setNotas((prev) => ({
      ...prev,
      [materia]: {
        ...prev[materia],
        [bimestre]: valor
      }
    }));
  };

  const calcularMedia = (materia) => {
    const bimestres = notas[materia] || {};
    const valores = Object.values(bimestres).map(Number).filter(v => !isNaN(v));
    if (valores.length === 0) return '-';
    const soma = valores.reduce((acc, v) => acc + v, 0);
    return (soma / valores.length).toFixed(2);
  };

  const salvarNotas = async () => {
    try {
      await lancarNota({ aluno: alunoSelecionado, notas });
      alert('Notas salvas com sucesso!');
    } catch (err) {
      alert('Erro ao salvar notas');
    }
  };

 
  return (
    <div className="lancar-notas-container">
      <h2>Lançar Notas</h2>
      <p className="subtitulo">Gestão acadêmica e registro de desempenho discente.</p>

      <div className="painel-container">
        {/* Painel Pesquisar Aluno */}
        <div className="painel painel-pesquisar">
          <h3>Pesquisar Aluno</h3>
          <input
            type="text"
            placeholder="Nome ou matrícula..."
            value={alunoBusca}
            onChange={(e) => setAlunoBusca(e.target.value)}
          />
          <ul className="sugestoes-lista">
            {sugestoes.map((aluno, index) => (
              <li key={index} onClick={() => selecionarAluno(aluno)}>
                {aluno.nome} <br />
                Matrícula: #{aluno.matricula}
              </li>
            ))}
          </ul>
        </div>

        {/* Painel Informações do Aluno */}
        <div className="painel painel-info">
          <h3>Informações do Aluno</h3>
          {alunoSelecionado ? (
            <div>
              <p><strong>Nome completo:</strong> {alunoSelecionado.nome}</p>
              <p><strong>Turma / Série:</strong> {alunoSelecionado.turma}</p>
              <p><strong>Período letivo:</strong> {alunoSelecionado.periodo}</p>
              <p><strong>Status acadêmico:</strong> {alunoSelecionado.status}</p>
              {/* Aqui pode entrar a barra de progresso */}
            </div>
          ) : (
            <p>Nenhum aluno selecionado.</p>
          )}
        </div>
      </div>

      {/* Painel Planilha de Disciplinas */}
      {alunoSelecionado && (
        <div className="painel painel-planilha">
          <h3>Disciplinas e Notas</h3>
          <table className="tabela-disciplinas">
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Bimestre 1</th>
                <th>Bimestre 2</th>
                <th>Bimestre 3</th>
                <th>Bimestre 4</th>
                <th>Média Parcial</th>
              </tr>
            </thead>
            <tbody>
              {alunoSelecionado.materias?.map((materia, index) => (
                <tr key={index}>
                  <td>{materia}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(e) => handleNotaChange(materia, 'b1', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(e) => handleNotaChange(materia, 'b2', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(e) => handleNotaChange(materia, 'b3', e.target.value)}
                    />
                  </td>
                  <td>{calcularMedia(materia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-salvar" onClick={salvarNotas}>Salvar Notas</button>
        </div>
      )}
    </div>
  );
}


export default LancarNotas;