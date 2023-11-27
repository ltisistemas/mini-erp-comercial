import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc, collection } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBYiaJE-S9lxo4IB64oPt3wNX0pi4RRNXI",
  authDomain: "lti-mini-erp-comercial.firebaseapp.com",
  projectId: "lti-mini-erp-comercial",
  storageBucket: "lti-mini-erp-comercial.appspot.com",
  messagingSenderId: "76580285795",
  appId: "1:76580285795:web:38fedc2f6df84f57ac7756",
  measurementId: "G-L8QZVFEYXH",
};

(async () => {
  const estados = [
    { codigo: 12, uf: "AC", estado: "Acre" },
    { codigo: 27, uf: "AL", estado: "Alagoas" },
    { codigo: 16, uf: "AP", estado: "Amapá" },
    { codigo: 13, uf: "AM", estado: "Amazonas" },
    { codigo: 29, uf: "BA", estado: "Bahia" },
    { codigo: 23, uf: "CE", estado: "Ceará" },
    { codigo: 53, uf: "DF", estado: "Distrito Federal" },
    { codigo: 32, uf: "ES", estado: "Espírito Santo" },
    { codigo: 52, uf: "GO", estado: "Goiás" },
    { codigo: 21, uf: "MA", estado: "Maranhão" },
    { codigo: 51, uf: "MT", estado: "Mato Grosso" },
    { codigo: 50, uf: "MS", estado: "Mato Grosso do Sul" },
    { codigo: 31, uf: "MG", estado: "Minas Gerais" },
    { codigo: 15, uf: "PA", estado: "Pará" },
    { codigo: 25, uf: "PB", estado: "Paraíba" },
    { codigo: 41, uf: "PR", estado: "Paraná" },
    { codigo: 26, uf: "PE", estado: "Pernambuco" },
    { codigo: 22, uf: "PI", estado: "Piauí" },
    { codigo: 33, uf: "RJ", estado: "Rio de Janeiro" },
    { codigo: 24, uf: "RN", estado: "Rio Grande do Norte" },
    { codigo: 43, uf: "RS", estado: "Rio Grande do Sul" },
    { codigo: 11, uf: "RO", estado: "Rondônia" },
    { codigo: 14, uf: "RR", estado: "Roraima" },
    { codigo: 42, uf: "SC", estado: "Santa Catarina" },
    { codigo: 35, uf: "SP", estado: "São Paulo" },
    { codigo: 28, uf: "SE", estado: "Sergipe" },
    { codigo: 17, uf: "TO", estado: "Tocantins" },
  ];

  const app = initializeApp(config);
  const db = getFirestore(app);
  const transacao = writeBatch(db);

  console.log("> Iniciando Importação dos estados");
  estados.forEach((estado) => {
    const ref = doc(collection(db, "estados"));

    transacao.set(ref, estado, { merge: true });
  });

  await transacao.commit();
  console.log("> Importação dos estados Finalizada com sucesso");
})();
