import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const cadastrarAluno = async (dados) => {
  try {
    const docRef = await addDoc(collection(db, 'alunos'), dados);
    console.log('Aluno cadastrado com ID:', docRef.id);
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
  }
};
