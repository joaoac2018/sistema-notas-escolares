// notaService.js
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const lancarNota = async (dadosNota) => {
  try {
    const docRef = await addDoc(collection(db, 'notas'), {
      aluno: dadosNota.nomealuno,
      materia: dadosNota.disciplina,
      turma: dadosNota.turma,
      nota: dadosNota.nota,
      data: new Date(),
    });
    console.log('Nota lançada com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao lançar nota:', error);
    throw error;
  }
};