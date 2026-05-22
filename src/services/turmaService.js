import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';

/**
 * Cadastra uma nova turma no Firestore
 * @param {Object} dadosTurma - { nome, turno, sala }
 */
export const cadastrarTurma = async (dadosTurma) => {
  try {
    const docRef = await addDoc(collection(db, 'turmas'), {
      Nome: dadosTurma.nome,
      turno: dadosTurma.turno,
      sala: dadosTurma.sala,
      professor: dadosTurma.professor,
      ano: new Date().getFullYear(), // opcional: define o ano atual
    });
    console.log('Turma cadastrada com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao cadastrar turma:', error);
    throw error;
  }
};