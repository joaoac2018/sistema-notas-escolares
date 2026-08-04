  // src/services/disciplinaService.js
  import { db } from './firebase';
  import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

  export const adicionarDisciplina = async (alunoId, disciplina) => {
    try {
      const alunoRef = doc(db, 'alunos', alunoId);

      await updateDoc(alunoRef, {
        notas: arrayUnion({
          disciplina: disciplina,
          bimestre: {
            b1: 0,
            b2: 0,
            b3: 0,
            b4: 0
          },
          periodoLetivo: "2026"
        })
      });

      console.log(`Disciplina ${disciplina} adicionada para aluno ${alunoId}`);
      return true;
    } catch (error) {
      console.error("Erro ao adicionar disciplina:", error);
      throw error;
    }
};