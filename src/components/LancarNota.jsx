import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function LancarNota() {
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');
  const [bimestre, setBimestre] = useState('');
  const [nota, setNota] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      const alunosSnapshot = await getDocs(collection(db, 'alunos'));
      const disciplinasSnapshot = await getDocs(collection(db, 'disciplinas'));

      setAlunos(alunosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setDisciplinas(disciplinasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaNota = {
      alunoId,
      disciplinaId,
      bimestre: Number(bimestre),
      nota: Number(nota),
      dataRegistro: new Date()
    };

    try {
      await addDoc(collection(db, 'notas'), novaNota);
      alert('Nota lançada com sucesso!');
      setAlunoId('');
      setDisciplinaId('');
      setBimestre('');
      setNota('');
    } catch (error) {
      console.error('Erro ao lançar nota:', error);
      alert('Erro ao lançar nota');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Lançar Nota</h2>
      <form onSubmit={handleSubmit}>
        <label><strong>Aluno:</strong></label>
        <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '1rem' }}
        >
          <option value="">Selecione</option>
          {alunos.map(aluno => (
            <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
          ))}
        </select>

        <label><strong>Disciplina:</strong></label>
        <select value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '1rem' }}
        >
          <option value="">Selecione</option>
          {disciplinas.map(disciplina => (
            <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
          ))}
        </select>

        <label><strong>Bimestre:</strong></label>
        <select value={bimestre} onChange={(e) => setBimestre(e.target.value)} 
          required
          style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '1rem' }}
        >
          <option value="">Selecione</option>
          <option value="1">1º Bimestre</option>
          <option value="2">2º Bimestre</option>
          <option value="3">3º Bimestre</option>
          <option value="4">4º Bimestre</option>
        </select>

        <label><strong>Nota:</strong></label>
        <input type="number" step="0.1" min="0" max="10" value={nota} onChange={(e) => setNota(e.target.value)} required />
       
        <button type="submit" style={{ marginTop: '1rem' }}><strong>Lançar Nota</strong></button>
        
      </form>
    </div>
  );
}

export default LancarNota;