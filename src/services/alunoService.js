// src/services/alunoService.js
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const buscarAlunosPorNome = async (texto) => {
  const alunosRef = collection(db, 'alunos');
  const q = query(
    alunosRef,
    where('nomeLower', '>=', texto.toLowerCase()),
    where('nomeLower', '<=', texto.toLowerCase() + '\uf8ff')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};