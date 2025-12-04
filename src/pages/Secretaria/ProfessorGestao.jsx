import React, { useState, useEffect } from 'react';
import './ProfessorGestao.css';
import { listarProfessor, salvarProfessor } from '../../services/professorServices';
import { FaUserPlus, FaEdit, FaTrashAlt, FaChalkboard } from 'react-icons/fa';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function ProfessorGestao() {
  const [acaoAtiva, setAcaoAtiva] = useState(null);
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [turma, setTurma] = useState('');

  // 🔹 Buscar professores do Firestore
  useEffect(() => {
    const carregarProfessores = async () => {
      try {
        const lista = await listarProfessor();
        setProfessores(lista);
      } catch (error) {
        console.error("Erro ao buscar professores: ", error);
      }
    };

    carregarProfessores();
  }, []);

  // 🔹 Cadastrar professor no Firestore
  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const novoProfessor = {
        nome,
        disciplina,
        turma
      };
      await salvarProfessor(novoProfessor);
      alert('Professor cadastrado com sucesso!');
      setNome('');
      setTurma('');
      setDisciplina('');
      setAcaoAtiva(null); // Fecha o formulário
    } catch (error) {
      alert('Erro ao cadastrar professor');
      console.error(error);
    }
  };

  const buscarProfessores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'professores'));
      const professoresFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfessores(professoresFirebase);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    }
  };

  const acoes = [
    {
      titulo: 'Cadastrar Professor',
      descricao: 'Adicionar novo professor ao sistema',
      icone: <FaUserPlus className="card-icon" />,
      acao: () => setAcaoAtiva('formulario'),
    },
    {
      titulo: 'Editar Professor',
      descricao: 'Atualizar dados e matérias',
      icone: <FaEdit className="card-icon" />,
      acao: () => alert('Função de edição em breve!'),
    },
    {
      titulo: 'Excluir Professor',
      descricao: 'Remover professor do sistema',
      icone: <FaTrashAlt className="card-icon" />,
      acao: () => alert('Função de exclusão em breve!'),
    },
    {
      titulo: 'Exibir Professores',
      descricao: 'Visualizar todos os professores cadastrados',
      icone: <FaChalkboard className="card-icon" />,
      acao: () => {
        buscarProfessores();
        setAcaoAtiva('lista');
    },
    }
  ];


  return (
    <div className="professor-gestao-container">
      <h2>Gestão de Professores</h2>

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
        <div className="lista-professores">
          <h3>Professores Cadastrados</h3>
          <ul>
            {professores.map((professor) => (
              <li key={professor.id}>
                <div className="professor-card">
                  <span>
                    <strong>{professor.nome}</strong> — {professor.disciplina}
                  </span>
                  <button>Detalhes</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {acaoAtiva === 'formulario' && (
        <div className="formulario-professor">
          <form onSubmit={handleCadastro}>
              <label>
                Nome:
                <input 
                type="text" 
                placeholder="Digite o Nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
              </label>
              <label>
                Disciplina:
                <input 
                type="text" 
                placeholder="Ex: Matemática" 
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                />
              </label>
              <label>
                Turma:
                <input 
                type="text" 
                placeholder="Ex: 2º Ano B" 
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                />
              </label>
              <button type="submit">Cadastrar</button>
            </form>
        </div>
      )}
    </div>
  );
}

export default ProfessorGestao;