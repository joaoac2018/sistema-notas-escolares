// src/services/alunoService.js
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const buscarAlunosPorNome = async (texto) => {
  const alunosRef = collection(db, 'alunos');
  const q = query(
    alunosRef,
    where('nome', '>=', texto),
    where('nome', '<=', texto + '\uf8ff')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};