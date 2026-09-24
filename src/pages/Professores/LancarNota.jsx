import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, addDoc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { lancarNota } from '../../services/notaservice';
import { buscarAlunosPorNome } from '../../services/alunoService';
import './LancarNota.css';

function LancarNotas() {
  const [alunoBusca, setAlunoBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [digitando, setDigitando] = useState(true);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [notas, setNotas] = useState([]);


  useEffect(() => {
      const buscar = async () => {
        if (digitando && alunoBusca.length > 1) {
          const resultados = await buscarAlunosPorNome(alunoBusca);
          setSugestoes(resultados);
        } else {
          setSugestoes([]);
        }
      };
      buscar();
    }, [alunoBusca, digitando]);

    const buscarNotasDoAluno = async (alunoId) => {
      //1.Buscar disciplinas fixas dos alunos
      const disciplinasRef = collection(db, "disciplinas");
      const qDisciplinas = query(disciplinasRef, orderBy("ordem", "asc"));
      const snapshotDisciplinas = await getDocs(qDisciplinas);
      const disciplinas = snapshotDisciplinas.docs.map(doc => ({ 
        id_disciplina: doc.id,
        nome: doc.data().nome,
        ordem: doc.data().ordem
      }));

      //2.Buscar notas do aluno
      const notasRef = collection(db, "notas");
      const qNotas = query(notasRef, where("id_aluno", "==", alunoId)); 
      const snapshotNotas = await getDocs(qNotas);
      const notasAluno = snapshotNotas.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      //3. Combinar disciplinas com notas
      return disciplinas.map(disciplina => {
        const nota = notasAluno.find(n => n.id_disciplina === disciplina.id_disciplina);
        return {
          id: nota?.id || null,
          id_disciplina: disciplina.id_disciplina,
          disciplina: disciplina.nome,
          ordem: disciplina.ordem,
          bimestre: nota ? nota.bimestre : { b1: '', b2: '', b3: '', b4: '' }
        };
      });
    };

    const handleSelectAluno = (aluno) => {
      setAlunoBusca(aluno.nome);
      setDigitando(false);
      setSugestoes([]);
      selecionarAluno(aluno);
    };

    const onChangeInput = (e) => {
      setDigitando(true);
      setAlunoBusca(e.target.value);
    };

    const selecionarAluno = async (aluno) => {
      setAlunoSelecionado({
        id: aluno.id,
        nome: aluno.nome,
        matricula: aluno.matricula,
        ...aluno
      });
      const notasDoAluno = await buscarNotasDoAluno(aluno.id);
      setNotas(notasDoAluno);
    };

    const handleNotaChange = async (nota, bimestre, valor, alunoId) => {
      if (nota.id) {
    // já existe documento de nota
    const notaRef = doc(db, "notas", nota.id);
    await updateDoc(notaRef, { [`bimestre.${bimestre}`]: Number(valor) });
  } else {
    // não existe, criar novo documento
    const novaNota = await addDoc(collection(db, "notas"), {
      id_aluno: alunoId,
      id_disciplina: nota.id_disciplina,
      disciplina: nota.disciplina,
      ordem: nota.ordem,
      bimestre: { [bimestre]: Number(valor) },
      periodoLetivo: "2026"
    });
    nota.id = novaNota.id; // atualiza estado local com o novo id
  }

      //Atualiza estado local para refletir a mudança imediatamente
      setNotas(prevNotas => 
        prevNotas.map((n) =>
          n.id_disciplina === nota.id_disciplina 
            ? { ...n, bimestre: { ...n.bimestre, [bimestre]: 
              Number(valor) }, id: nota.id } 
              : n
      )
    );
};
  const calcularMedia = (bimestre) => {
    const valores = Object.values(bimestre || {}).map(Number).filter(v => !isNaN(v));
    if (valores.length === 0) return '-';
    const soma = valores.reduce((acc, v) => acc + v, 0);
    return (soma / valores.length).toFixed(2);
  };


  const salvarNotas = async () => {
    try {
        const notasParaSalvar = notas.map(nota => {
          const valores = Object.values(nota.bimestre || {})
            .map(Number)
            .filter(v => !isNaN(v));
          return {
            id: nota.id,
            disciplina: nota.disciplina,
            id_disciplina: nota.id_disciplina,
            valores
          };
        });

      await lancarNota({ aluno: alunoSelecionado, notas: notasParaSalvar });
      alert("Notas salvas com sucesso!");
    } 
    catch (err) {
      alert("Erro ao salvar notas");
    }
  };

 
  return (
    <div className="lancar-notas-container">
      <h2>Painel de Notas</h2>
      <p className="subtitulo">Gestão acadêmica e registro de desempenho discente.</p>

      <div className="painel-container">
        {/* Painel Pesquisar Aluno */}
        <div className="painel-pesquisar">
          <h3>Pesquisar Aluno</h3>
          <input
            type="text"
            placeholder="Digite o nome do aluno"
            value={alunoBusca}
            onChange={onChangeInput}
          />
          {sugestoes.length > 0 && (
            <ul className="sugestoes-lista">
              {sugestoes.map((aluno, index) => (
                <li key={index} onClick={() => handleSelectAluno(aluno)}>
                  {aluno.nome} <br />
                  Matrícula: #{aluno.matricula}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Painel Informações do Aluno */}
        <div className="painel-info">
          <h3>Informações do Aluno</h3>
          {alunoSelecionado ? (
            <div>
              <p><strong>Nome completo:</strong> {alunoSelecionado.nome}</p>
              <p><strong>Turma / Série:</strong> {alunoSelecionado.turmaId}</p>
              <p><strong>Período letivo:</strong> {alunoSelecionado.periodoLetivo}</p>
              <p><strong>Status acadêmico:</strong> {alunoSelecionado.statusAcademico}</p>
              {/* Aqui pode entrar a barra de progresso */}
            </div>
          ) : (
            <p>Nenhum aluno selecionado.</p>
          )}
        </div>
      </div>
        
      {/* Painel Planilha de Disciplinas */}
      {alunoSelecionado && (
        <div className="painel-planilha">
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
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.disciplina}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      defaultValue={nota.bimestre?.b1 || ''}
                      onChange={(e) => handleNotaChange(nota, 'b1', e.target.value, alunoSelecionado.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      defaultValue={nota.bimestre?.b2 || ''}
                      onChange={(e) => handleNotaChange(nota, 'b2', e.target.value, alunoSelecionado.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      defaultValue={nota.bimestre?.b3 || ''}
                      onChange={(e) => handleNotaChange(nota, 'b3', e.target.value, alunoSelecionado.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      defaultValue={nota.bimestre?.b4 || ''}
                      onChange={(e) => handleNotaChange(nota, 'b4', e.target.value, alunoSelecionado.id)}
                    />
                  </td>
                  <td>{calcularMedia(nota.bimestre)}</td>
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