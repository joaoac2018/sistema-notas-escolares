import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

function CadastroAluno() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [turmaId, setTurmaId] = useState('');
  const [responsavel, setResponsavel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoAluno = {
      nome,
      dataNascimento,
      turmaId,
      responsavel,
      usuarioId: `uid_${Date.now()}` // gera um ID simples para teste
    };

    try {
      await addDoc(collection(db, 'alunos'), novoAluno);
      alert('Aluno cadastrado com sucesso!');
      setNome('');
      setDataNascimento('');
      setTurmaId('');
      setResponsavel('');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Erro ao cadastrar aluno');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Data de Nascimento:</label>
        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />

        <label>Turma:</label>
        <input type="text" value={turmaId} onChange={(e) => setTurmaId(e.target.value)} required />

        <label>Responsável:</label>
        <input type="text" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} required />

        <button type="submit" style={{ marginTop: '1rem' }}>Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroAluno;