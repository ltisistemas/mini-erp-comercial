export const environment = {
  production: false,
  appVersion: require("../../package.json").version + "-dev",
  host_page: "http://localhost:4200",
  jwt_key: "8c74ec9e099c920eba5ba30465e76d214d565b26",
  storage: {
    token: "lti-mini-erp-comercial-accessToken",
    usuario: "lti-mini-erp-comercial-usuario",
  },
  tabelas: {
    empresa: "empresa",
    usuario: "usuario",
    clientes: "clientes",
    produtos: "produtos",
    categoria: "categorias",
    sub_categoria: "sub_categorias",
    fornecedores: "fornecedores",
  },
  firebaseConfig: {
    apiKey: "AIzaSyBYiaJE-S9lxo4IB64oPt3wNX0pi4RRNXI",
    authDomain: "lti-mini-erp-comercial.firebaseapp.com",
    projectId: "lti-mini-erp-comercial",
    storageBucket: "lti-mini-erp-comercial.appspot.com",
    messagingSenderId: "76580285795",
    appId: "1:76580285795:web:38fedc2f6df84f57ac7756",
    measurementId: "G-L8QZVFEYXH",
  },
};
