import { initializeApp } from "firebase/app";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { getFirestore, writeBatch, doc, collection } from "firebase/firestore";
import * as bcrypt from "bcryptjs";

const config = {
  apiKey: "AIzaSyAoacsq9jpbnYM0y7ihSAcYr8iGrFmmnWA",
  authDomain: "lti-cota-pra-mim.firebaseapp.com",
  projectId: "lti-cota-pra-mim",
  storageBucket: "lti-cota-pra-mim.appspot.com",
  messagingSenderId: "249875147130",
  appId: "1:249875147130:web:5c7da6ee73cfd068764ec3",
  measurementId: "G-0654CPJFSE",
};

(async () => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);

    const senha = bcrypt.hashSync("sEnha004", salt);
    console.log(senha);
  });
  // // Initialize Firebase
  // const app = initializeApp(config);

  // const alunos = [];

  // const db = getFirestore(app);

  // const transacao = writeBatch(db);

  // for (let a = 0; a < 50; a++) {
  //   const cliente = {
  //     nome_fantasia: form.get("nome_fantasia")?.value,
  //     razao_social: form.get("razao_social")?.value,
  //     cpf_cnpj: form.get("cpf_cnpj")?.value,
  //     email: form.get("email")?.value,
  //     telefone: form.get("telefone")?.value,
  //     cep: form.get("cep")?.value,
  //     logradouro: form.get("logradouro")?.value,
  //     numero: form.get("numero")?.value,
  //     complemento: form.get("complemento")?.value,
  //     bairro: form.get("bairro")?.value,
  //     cidade: form.get("cidade")?.value,
  //     estado: form.get("estado")?.value,
  //     estado_uf: form.get("estado_uf")?.value,
  //     status: component.data.cliente?.status,

  //     // academia_id: "h9j1XeESkQ8UfH2hCdXY",
  //     // horario_id: horarios[horario_id],
  //     // nome: faker.person.fullName(),
  //     // apelido: "",
  //     // status: "ATIVO",
  //     // valor_mensalidade: 150,
  //     // grau: graus[grau],
  //     // faixa: faixas[faixa],
  //     // email: faker.internet.email().toLowerCase(),
  //     // password: "$2a$10$Nw.lsM23bCKG4DYmefSJI.lAgs0lf8FrtmzPY1W91Bir5njHse7K2",
  //   };

  //   const ref = doc(collection(db, "clientes"));

  //   transacao.set(ref, cliente, { merge: true });

  //   // clientes.push(aluno);
  // }

  // await transacao.commit();

  // console.log("> Clientes criados com sucesso");
})();
