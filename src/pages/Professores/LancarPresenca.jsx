import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function LancarPresenca() {
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [turmaId, setTurmaId] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');
  const [dataAula, setDataAula] = useState('');
  const [presencas, setPresencas] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const turmasSnap = await getDocs(collection(db, 'turmas'));
      const disciplinasSnap = await getDocs(collection(db, 'disciplinas'));

      setTurmas(turmasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setDisciplinas(disciplinasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    carregarDados();
  }, []);

  useEffect(() => {
    const carregarAlunos = async () => {
      if (!turmaId) return;
      const alunosSnap = await getDocs(collection(db, 'alunos'));
      const alunosDaTurma = alunosSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(aluno => aluno.turmaId === turmaId);

      setAlunos(alunosDaTurma);
      setPresencas(alunosDaTurma.map(aluno => ({ alunoId: aluno.id, presente: true })));
    };
    carregarAlunos();
  }, [turmaId]);

  const togglePresenca = (alunoId) => {
    setPresencas(prev =>
      prev.map(p =>
        p.alunoId === alunoId ? { ...p, presente: !p.presente } : p
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'presencas'), {
        disciplinaId,
        turmaId,
        dataAula,
        presencas
      });
      alert('Presenças lançadas com sucesso!');
      setDisciplinaId('');
      setTurmaId('');
      setDataAula('');
      setPresencas([]);
      setAlunos([]);
    } catch (error) {
      console.error('Erro ao lançar presenças:', error);
      alert('Erro ao lançar presenças');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Lançar Presenças de Aula</h2>
      <form onSubmit={handleSubmit}>
        <label><strong>Data da Aula:</strong></label>
        <input type="date" value={dataAula} onChange={(e) => setDataAula(e.target.value)} required />

        <label><strong>Turma:</strong></label>
        <select value={turmaId} onChange={(e) => setTurmaId(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '1rem'}}
        >
          <option value="">Selecione</option>
          {turmas.map(t => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>

        <label><strong>Disciplina:</strong></label>
        <select value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)} 
            required
            style={{width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '1rem' }}
           
        >
          <option value="">Selecione</option>
          {disciplinas
            .filter(d => d.turmaId === turmaId)
            .map(d => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
        </select>

        {alunos.length > 0 && (
          <>
            <h3 style={{ marginTop: '2rem' }}>Presenças</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Aluno</th>
                  <th style={{ borderBottom: '1px solid #ccc' }}>Presença</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => {
                  const presenca = presencas.find(p => p.alunoId === aluno.id);
                  return (
                    <tr key={aluno.id}>
                      <td style={{ padding: '8px' }}>{aluno.nome}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => togglePresenca(aluno.id)}
                          style={{
                            fontSize: '1.2rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {presenca?.presente ? '✔️' : '❌'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        <button type="submit" style={{ marginTop: '2rem' }}><strong>Salvar Presenças</strong></button>
      </form>
    </div>
  );
}

export default LancarPresenca;