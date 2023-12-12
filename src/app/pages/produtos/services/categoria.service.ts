import { Injectable } from "@angular/core";
import { Categoria } from "../entities/categoria";
import { CategoriaError, CategoriaNotFound } from "../error/categoria-error";
import { environment } from "src/environments/environment";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";

@Injectable({ providedIn: "root" })
export class CategoriaService {
  constructor(
    private api: FirebaseService,
    private usuarioService: UsuarioLogadoUsecaseService
  ) {}

  async listar(): Promise<Categoria[] | CategoriaError> {
    const usuario = this.usuarioService.buscarUsuarioLogado();

    const snapshot = await this.api.getSnapshot({
      table: environment.tabelas.categoria,
      campo: "empresa_id",
      valor: usuario.empresa_id,
    });

    if (snapshot) {
      return snapshot.docs.map((doc) => {
        return {
          uid: doc.id,
          empresa_id: (doc.data() as any).empresa_id,
          descricao: (doc.data() as any).descricao,
        } as Categoria;
      });
    }

    return new CategoriaNotFound();
  }

  async incluir(categoria: Categoria): Promise<boolean | CategoriaError> {
    try {
      const request = {
        empresa_id: categoria.empresa_id,
        descricao: categoria.descricao,
      };

      await this.api.addDOcument(environment.tabelas.categoria, request);

      return true;
    } catch (err) {
      return new CategoriaError("Houve um erro ao tentar salvar");
    }
  }

  async editar(categoria: Categoria): Promise<boolean | CategoriaError> {
    try {
      await this.api.updateDOcument(
        environment.tabelas.categoria,
        categoria.uid,
        { descricao: categoria.descricao }
      );

      return true;
    } catch (err) {
      return new CategoriaError("Houve um erro ao tentar salvar");
    }
  }
}
