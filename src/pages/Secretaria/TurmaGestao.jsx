import React, { useState } from 'react';
import './TurmaGestao.css';
import { cadastrarTurma } from './turmaService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FaPlus, FaEdit, FaTrashAlt, FaListUl } from 'react-icons/fa';

function TurmaGestao() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);

  const [acaoAtiva, setAcaoAtiva] = useState(null);
  const [turmas, setTurmas] = useState([
    { nome: '1º Ano A', turno: 'Manhã', sala: '101' },
    { nome: '2º Ano B', turno: 'Tarde', sala: '202' },
    { nome: '3º Ano C', turno: 'Integral', sala: '303' },
  ]);

  const [nome, setNome] = useState('');
  const [turno, setTurno] = useState('');
  const [sala, setSala] = useState('');
  const [professor, setProfessor] = useState('');
  const [disciplina, setDisciplina] = useState('');

  const [turmaExpandida, setTurmaExpandida] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { nome, turno, sala, professor, disciplina };
    try {
      await cadastrarTurma(dados);
      alert('Turma cadastrada com sucesso!');
      setNome('');
      setTurno('');
      setSala('');
      setProfessor('');
      setDisciplina('')
      setAcaoAtiva(null); // fecha o formulário
    } catch (error) {
      alert('Erro ao cadastrar turma');
    }
  };

  const buscarTurmas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'turmas'));
      const turmasFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTurmas(turmasFirebase);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  const [mostrarExclusao, setMostrarExclusao] = useState(false);

  const acoes = [
    {
      titulo: 'Cadastrar Turma',
      descricao: 'Criar nova turma no sistema',
      icone: <FaPlus className="card-icon" />,
      acao: () => setAcaoAtiva('formulario'),
    },
    {
      titulo: 'Editar Turma',
      descricao: 'Atualizar dados da turma',
      icone: <FaEdit className="card-icon" />,
      acao: () => alert('Função de edição em breve!'),
    },
    {
      titulo: 'Excluir Turma',
      descricao: 'Remover turma cadastrada',
      icone: <FaTrashAlt className="card-icon" />,
      acao: () => alert('função de exclusao em breve!'),
    },
    {
      titulo: 'Turmas Cadastradas',
      descricao: 'Visualizar todas as turmas cadastradas',
      icone: <FaListUl className="card-icon" />,
      acao: () => {
        buscarTurmas();
        setAcaoAtiva('lista');
      },
    }
  ];


  return (
    <div className="turma-gestao-container">
      <h2>Gestão de Turmas</h2>

      <div className="card-grid">
        {acoes.map((acao, index) => (
          <div key={index} className="card" onClick={acao.acao}>
            {acao.icone}
            <h3>{acao.titulo}</h3>
            <p>{acao.descricao}</p>
          </div>
        ))}
      </div>

      {acaoAtiva === 'lista' && (
        <div className="lista-turmas">
          <h3>Turmas Cadastradas</h3>
          <ul>
            {turmas.map((turma) => (
              <li key={turma.id} style={{ marginBottom: '1rem' }}>
                <strong>{turma.Nome}</strong> — {turma.turno} (Sala {turma.sala})
                <button
                  style={{ marginLeft: '1rem' }}
                  onClick={() =>
                    setTurmaExpandida(turmaExpandida === turma.id ? null : turma.id)
                  }
                >
                  {turmaExpandida === turma.id ? 'Ocultar' : 'Detalhes'}
                </button>

                {turmaExpandida === turma.id && (
                  <div className="detalhes-turma" style={{ marginTop: '0.5rem' }}>
                    <p><strong>Ano:</strong> {turma.ano}</p>
                    <p><strong>Professor:</strong> {turma.professor}</p>
                    <p><strong>Disciplina:</strong> {turma.disciplina}</p>
                    <p><strong>Turno:</strong> {turma.turno}</p>
                    <p><strong>Sala:</strong> {turma.sala}</p>
                    {/* Adicione mais campos se quiser */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}


      {acaoAtiva === 'exclusao' && (
        <div className="excluir-turmas">
          {/* lista com botões de exclusão */}
        </div>
      )}

      {acaoAtiva === 'formulario' && (
        <div className="formulario-turma">
          <h3>Cadastro de Turma</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nome da Turma:
              <input type="text" placeholder="Ex: 1º Ano A"
                value={nome}
                onChange={(e) => setNome(e.target.value)} />
            </label>
            <label>
              Turno:
              <select value={turno} onChange={(e) => setTurno(e.target.value)}>
                <option value="">Selecione o turno</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Integral</option>
              </select>
            </label>
            <label>
              Sala:
              <input type="text" placeholder="Ex: 101"
                value={sala} onChange={(e) => setSala(e.target.value)} />
            </label>
            <label>
              Professor:
              <input type="text" placeholder="Ex: João Silva"
                value={professor} onChange={(e) => setProfessor(e.target.value)} />
            </label>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      )}

      {mostrarExclusao && (
        <div className="excluir-turmas">
          <h3>Excluir Turmas</h3>
          <ul>
            {turmas.map((turma) => (
              <li key={turma.id}>
                <strong>{turma.nome}</strong> — {turma.turno} (Sala {turma.sala})
                <button
                  onClick={() =>
                    setTurmas(turmas.filter((t) => t.id !== turma.id))
                  }
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mostrarLista && (
        <div className="lista-turmas">
          <h3>Turmas Cadastradas</h3>
          <ul>
            {turmas.map((turma, index) => (
              <li key={index}>
                <strong>{turma.nome}</strong> — {turma.turno} (Sala {turma.sala})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TurmaGestao;