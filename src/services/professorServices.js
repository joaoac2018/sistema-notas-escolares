import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const listarProfessor = async () => {
  try {
      const snapshot = await getDocs(collection(db, 'professores'));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Erro ao buscar professores cadastrados:', error);
      throw error;
    }
    }; 
    
    export const salvarProfessor = async (professor) => {
    try {
      const docRef = await addDoc(collection(db, 'professores'), professor);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      throw error;
    }
  };