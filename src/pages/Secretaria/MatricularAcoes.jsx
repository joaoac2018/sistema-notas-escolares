import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { salvarAluno, listarAlunosMatriculados } from '../../services/matriculaServices';
import { FaUserPlus, FaEdit, FaTrashAlt, FaChalkboard } from 'react-icons/fa';
import { db } from '../../services/firebase';
import './MatricularAcoes.css';

 // Lista de disciplinas fixas
  const disciplinasFixas = [
    { id: "matematica", nome: "Matemática", ordem: 1 },
    { id: "lingua portuguesa", nome: "Português", ordem: 2 },
    { id: "historia", nome: "História", ordem: 3 },
    { id: "geografia", nome: "Geografia", ordem: 4 },
    { id: "ciencias", nome: "Ciências Físicas e Biológicas", ordem: 5 },
    { id: "educacao fisica", nome: "Educação Física", ordem: 6 },
    { id: "artes", nome: "Artes", ordem: 7 }
  ];

  // Função para criar notas padrão (fora do componente)
  const criarNotasPadraoParaAluno = async (alunoId, periodoLetivo) => { 
   for (const disciplina of disciplinasFixas) {
      await addDoc(collection(db, "notas"), {
        id_aluno: alunoId,
        id_disciplina: disciplina.id,
        disciplina: disciplina.nome,
        ordem: disciplina.ordem,
        bimestre: { b1: 0, b2: 0, b3: 0, b4: 0 },
        periodoLetivo
     });
    }
  };

  function MatricularAcoes() {
    const [acaoAtiva, setAcaoAtiva] = useState(null);
    const [alunos, setAlunos] = useState([]);
    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [turma, setTurma] = useState('');
  
    useEffect(() => {
        const carregarAlunos = async () => {
          try {
            const lista = await listarAlunosMatriculados();
            setAlunos(lista);
          } catch (error) {
            console.error('Erro ao carregar alunos:', error);
          }
        };        
        carregarAlunos();
      }, []);

    const handleMatricula = async (e) => {
    e.preventDefault();

    try {
      const novoAluno = {
      nome,
      nomeLower: nome.toLowerCase(),
      dataNascimento: nascimento,
      turmaId: turma,
      usuarioId: 'uid_' + Date.now(),
      periodoLetivo: "2026" 
    };

      // salva aluno no Firestore 
      const alunoId = await salvarAluno(novoAluno);

      // cria notas padrão para o aluno
      await criarNotasPadraoParaAluno(alunoId, novoAluno.periodoLetivo);


      alert('Aluno matriculado com sucesso!');
      setNome('');
      setNascimento('');
      setTurma('');
      setAcaoAtiva(null); // Fecha o formulário
      } catch (error) {
        alert('Erro ao matricular aluno');
      }
  };

  const buscarAlunos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'alunos'));
    const turmasFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlunos(turmasFirebase);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
  }
};

  const acoes = [
    {
      titulo: 'Matricular Aluno',
      descricao: 'Matricular um novo aluno em uma turma',
      icone: <FaUserPlus className="card-icon" />,
      acao: () => setAcaoAtiva('formulario')
    },
    {
      titulo: 'Editar Dados',
      descricao: 'Atualizar informações de um aluno',
      icone: <FaEdit className="card-icon" />,
      acao: () => alert('Função de edição em breve!'),
    },
    {
      titulo: 'Excluir Aluno',
      descricao: 'Remover um aluno da base de matrículas',
      icone: <FaTrashAlt className="card-icon" />,
      acao: () => alert('Função de exclusão em breve!'),
    },
    {
      titulo: 'Alunos Matriculados',
      descricao: 'Visualizar todos os matriculados na turma selecionada',
      icone: <FaChalkboard className="card-icon" />,
      acao: () => {
        buscarAlunos();
        setAcaoAtiva('lista');
      },
    }
  ];

  return (
    <div className="matricula-acoes-container">
      <h2>Gestão de Matrícula</h2>

      <div className="card-grid">
        {acoes.map((acao, index) => (
          <div key={index} className="card" onClick={acao.acao}>
            {acao.icone}
            <h3>{acao.titulo}</h3>
            <p>{acao.descricao}</p>
          </div>
        ))}
      </div>


      {acaoAtiva === 'formulario' && (
        <div className="formulario-matricula">
          <h3>Matricular Novo Aluno</h3>
            <form onSubmit={handleMatricula}>
              <label>
                Nome do Aluno:
                <input
                  type="text"
                  placeholder="Digite o nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  />
              </label>
              <label>
                Data de Nascimento:
                <input
                  type="date"
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                  />
              </label>
              <label>
                Turma:
                <input
                  type="text"
                  placeholder="Ex: 3º Ano A"
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  />
              </label>
              <button type="submit">Confirmar Matrícula</button>
            </form>
          </div>
        )}
        
        {acaoAtiva === 'lista' && (
          <div className="lista-alunos">
            <h3>Alunos Matriculados</h3>         
              <ul>
                {alunos.map((aluno) => (
                  <li key={aluno.id}>
                    <div className="aluno-card">
                      <span><strong>{aluno.nome}</strong> — {aluno.turma}</span>
                      <button>Detalhes</button>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        )}
      </div>
    );
}
export default MatricularAcoes;