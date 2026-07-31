// notaService.js
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const lancarNota = async ({ aluno, notas }) => {
  try {
    // aluno.id precisa ser o ID do documento do aluno na coleção "alunos"
    const alunoRef = doc(db, 'alunos', aluno.id);

    await updateDoc(alunoRef, {
      notas: notas // sobrescreve o campo "notas" com o array atualizado
    });

    console.log('Notas atualizadas para aluno:', aluno.nome);
    return true;
  } catch (error) {
    console.error('Erro ao lançar notas:', error);
    throw error;
  }
};