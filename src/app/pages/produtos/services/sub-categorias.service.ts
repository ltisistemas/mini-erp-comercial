import { Injectable } from "@angular/core";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import {
  SubCategoriaError,
  SubCategoriaNotFound,
} from "../error/sub-categoria-error";
import { SubCategoria } from "../entities/sub-categoria";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class SubCategoriasService {
  constructor(private api: FirebaseService) {}

  async listar(
    categoria_id: string
  ): Promise<SubCategoria[] | SubCategoriaError> {
    const snapshot = await this.api.getSnapshot({
      table: environment.tabelas.sub_categoria,
      campo: "categoria_id",
      valor: categoria_id,
    });

    if (snapshot) {
      return snapshot.docs.map((doc) => {
        return {
          uid: doc.id,
          categoria_id: (doc.data() as any).categoria_id,
          descricao: (doc.data() as any).descricao,
        } as SubCategoria;
      });
    }

    return new SubCategoriaNotFound();
  }
  async incluir(
    subCategoria: SubCategoria
  ): Promise<boolean | SubCategoriaError> {
    try {
      const request = {
        categoria_id: subCategoria.categoria_id,
        descricao: subCategoria.descricao,
      };

      await this.api.addDOcument(environment.tabelas.sub_categoria, request);

      return true;
    } catch (err) {
      return new SubCategoriaError("Houve um erro ao tentar salvar");
    }
  }
  async editar(
    subCategoria: SubCategoria
  ): Promise<boolean | SubCategoriaError> {
    try {
      await this.api.updateDOcument(
        environment.tabelas.sub_categoria,
        subCategoria.uid,
        { descricao: subCategoria.descricao }
      );

      return true;
    } catch (err) {
      return new SubCategoriaError("Houve um erro ao tentar salvar");
    }
  }
}
