import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const listarAlunosMatriculados = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'alunos'));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar alunos matriculados:', error);
    throw error;
  }
  }; 
  
  export const salvarAluno = async (aluno) => {
  try {
    const docRef = await addDoc(collection(db, 'alunos'), aluno);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar aluno:', error);
    throw error;
  }
};
