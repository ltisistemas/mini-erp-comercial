import { Injectable } from "@angular/core";
import { uuidv4 } from "src/app/shared/utils/geral";

@Injectable({ providedIn: "root" })
export class CoreControllerService {
  constructor() {}

  private config() {
    const name = uuidv4();
    // const app = initializeApp(environment.firebaseConfigGestao, name);
    // const db = getFirestore(app);
    // const auth = getAuth(app);

    // return { db, auth };
  }

  // async updateUserToAnotherBucket(data: { uid: string; nome: string }) {
  //   const { db, auth } = this.config();

  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await this.atualizarUsuario(db, data);

  //       return resolve(true);
  //     } catch (error) {
  //       throw new Error('Erro ao gravar as informações do usuário');
  //     }
  //   });
  // }
  // async atualizarUsuario(db: Firestore, data: { uid: string; nome: string }) {
  //   const batch = writeBatch(db);

  //   const ref = doc(collection(db, 'usuario'), data.uid);

  //   const request = { nome: data.nome };

  //   batch.update(ref, request);

  //   await batch.commit();
  // }
  // async setUserToAnotherBucket(data: {
  //   email: string;
  //   google_id: string;
  //   nome: string;
  //   password: string;
  //   status: string;
  // }) {
  //   const { db, auth } = this.config();

  //   return new Promise(async (resolve, reject) => {
  //     const uid: any = await this.salvarUsuario(auth, db, data);
  //     try {
  //       await this.associarUsuario(db, uid);
  //       return resolve(uid);
  //     } catch {
  //       throw new Error('Erro ao gravar as informações do usuário');
  //     }
  //   });
  // }
  // private async salvarUsuario(auth: any, db: any, data: any) {
  //   return new Promise(async (resolve, reject): Promise<any> => {
  //     return createUserWithEmailAndPassword(auth, data.email, data.password)
  //       .then(async (credential) => {
  //         const user = credential.user;

  //         try {
  //           const salt = bcrypt.genSaltSync(10);
  //           data.password = bcrypt.hashSync(data.password, salt);

  //           await setDoc(doc(db, 'usuario', user.uid), data);

  //           return resolve(user.uid);
  //         } catch (err) {
  //           throw new Error('Erro ao gravar as informações do usuário');
  //           // return reject(err);
  //         }
  //       })
  //       .catch(() => {
  //         throw new Error('Erro ao gravar as informações do usuário');
  //       });
  //   });
  // }
  // private async associarUsuario(db: any, uid: string) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const { service_id } = environment;

  //       const ref = collection(db, 'servico_usuario');

  //       const q = query(
  //         ref,
  //         where('service_id', '==', service_id),
  //         where('usuario_id', '==', uid)
  //       );

  //       const snapshot = await getDocs(q);
  //       if (snapshot.size <= 0) {
  //         await addDoc(collection(db, 'servico_usuario'), {
  //           service_id,
  //           usuario_id: uid,
  //         });
  //       }

  //       return resolve(uid);
  //     } catch (error) {
  //       throw new Error('Erro ao gravar as informações do usuário');
  //     }
  //   });
  // }
}
