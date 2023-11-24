import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import {
  DocumentSnapshot,
  WriteBatch,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  deleteObject,
  getBlob,
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { environment } from 'src/environments/environment';
import { UsuarioLogado } from 'src/app/modules/login/domain/entities/usuario-logado';
import { UsuarioFornecedorLogado } from 'src/app/modules/login/domain/entities/usuario-fornecedor-logado';
// import { UsuarioFornecedor } from 'src/app/modules/usuarios-fornecedor/domain/entities/usuario-fornecedor';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private _app: FirebaseApp;
  private _analytics: Analytics;
  private _provider: GoogleAuthProvider;

  constructor() {
    this._app = initializeApp(environment.firebaseConfig);
    this._analytics = getAnalytics(this._app);

    this._provider = new GoogleAuthProvider();
    this._provider.setCustomParameters({
      prompt: 'select_account',
    });
  }

  get app() {
    return this._app;
  }

  get auth() {
    return getAuth(this.app);
  }

  get db() {
    return getFirestore(this.app);
  }

  get storage() {
    const storage = getStorage(this.app);
    return storage;
  }

  table(tableName: string) {
    return collection(this.db, tableName);
  }

  async findById(tableName: string, id: string): Promise<DocumentSnapshot> {
    const ref = doc(this.db, tableName, id);
    const document = await getDoc(ref);
    return document;
  }

  async findOrFail(
    tableName: string,
    id: string
  ): Promise<DocumentSnapshot | null> {
    const ref = doc(this.db, tableName, id);
    const document = await getDoc(ref);
    return document.exists() ? document : null;
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    const auth = this.auth;
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return resolve(credentials);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async loginWithGoogle() {
    const auth = this.auth;
    const provider = this._provider;

    return new Promise(async (resolve, reject) => {
      try {
        return signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential!.accessToken;

            const user = result.user;

            return resolve({ user, token });
          })
          .catch((error) => {
            const errorCode = error.code;

            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error);

            return reject({ errorCode, errorMessage, email, credential });
          });
      } catch (err) {
        return reject(err);
      }
    });
  }

  async siginUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const auth = this.auth;
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return resolve(credentials);
      } catch (err) {
        return reject(err);
      }
    });
  }

  getUsuarioLogado() {
    const usuario = localStorage.getItem(environment.storage.usuario);
    if (usuario) {
      return JSON.parse(usuario) as UsuarioLogado;
    }

    return null;
  }
  getFornecedorLogado() {
    const usuario = localStorage.getItem(environment.storage.usuario);
    if (usuario) {
      return JSON.parse(usuario) as UsuarioFornecedorLogado;
    }

    return null;
  }
  getGenericUsusarioLogado() {
    const usuario = localStorage.getItem(environment.storage.usuario);
    if (usuario) {
      const user = JSON.parse(usuario);
      return user.hasOwnProperty('cliente_id')
        ? (user as UsuarioLogado)
        : (user as UsuarioFornecedorLogado);
    }

    return null;
  }

  getQuery(table_name: string, table_field_id: string, table_id: string) {
    const db = this.db;
    const q = query(
      collection(db, table_name),
      where(table_field_id, '==', table_id)
    );

    return q;
  }

  getDoc(table_name: string, table_id?: string) {
    return table_id
      ? doc(collection(this.db, table_name), table_id)
      : doc(collection(this.db, table_name));
  }

  async getSnapshot(options: { table: string; campo: string; valor: string }) {
    const ref = collection(this.db, options.table);
    const q = query(ref, where(options.campo, '==', options.valor));
    const snapshot = await getDocs(q);

    return snapshot.size > 0 ? snapshot : null;
  }

  startTransaction() {
    return writeBatch(this.db);
  }

  async commitTransaction(transaction: WriteBatch) {
    await transaction.commit();
  }

  async addDOcument(table: string, request: any) {
    const db = this.db;

    const batch = writeBatch(db);

    const ref = this.getDoc(table);

    batch.set(ref, request, { merge: true });

    await batch.commit();

    return ref;
  }

  async updateDOcument(table: string, uid: string, request: any) {
    const db = this.db;

    const batch = writeBatch(db);

    const ref = this.getDoc(table, uid);

    batch.update(ref, request);

    await batch.commit();
  }

  getOnSnapshot(options: {
    table_name: string;
    filed: string;
    value_field: string;
    callback: Function;
  }) {
    const q = this.getQuery(
      options.table_name,
      options.filed,
      options.value_field
    );

    onSnapshot(q, (querySnapshot) => options.callback(querySnapshot));
  }
  getOnSnapshotWithoutQuery(options: {
    table_name: string;
    callback: Function;
  }) {
    const q = query(this.table(options.table_name));

    onSnapshot(q, (querySnapshot) => options.callback(querySnapshot));
  }

  async getDownload(path: string) {
    const storage = this.storage;

    const url = await getDownloadURL(ref(storage, path));

    return url;
  }

  async getDocumentBlob(path: string) {
    const storage = this.storage;

    return getBlob(ref(storage, path))
      .then((blob) => blob)
      .catch((err) => console.log('> [ERRO]', err));
  }

  async deleteFile(path: string) {
    try {
      const docRef = ref(this.storage, path);

      // Delete the file
      return await deleteObject(docRef);
    } catch (error) {
      throw new Error('Erro ao realizar a exclusão do arquivo');
    }
  }

  async uploadFile(path: string, file: File | Blob) {
    const docRef = ref(this.storage, path);

    return uploadBytes(docRef, file);
  }
}
