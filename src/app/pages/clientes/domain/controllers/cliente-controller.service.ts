import { Injectable } from "@angular/core";
import { Cliente } from "../../entities/cliente";
import { FirebaseService } from "src/app/shared/utils/firebase.service";
import { ClientesComponent } from "../../components/clientes.component";
import { ClienteDialogComponent } from "../presentation/components/cliente-dialog/domain/presentation/cliente-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { QuerySnapshot } from "firebase/firestore";

@Injectable({ providedIn: "root" })
export class ClienteControllerService {
  constructor(private service: FirebaseService, private dialog: MatDialog) {}

  init(component: ClientesComponent) {
    this.service.getOnSnapshotWithoutQuery({
      table_name: "clientes",
      callback: (snapshot: QuerySnapshot) => {
        component.clientes = [];
        const clientes: Cliente[] = [];

        for (const doc of snapshot.docs) {
          const data = doc.data() as Cliente;
          const cliente = new Cliente({
            uid: doc.id,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            cpf_cnpj: data.cpf_cnpj,
            email: data.email,
            telefone: data.telefone,
            cep: data.cep,
            logradouro: data.logradouro,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            estado_uf: data.estado_uf,
            status: data.status,
          });

          clientes.push(cliente);
        }

        component.clientes = clientes.sort((a, b) =>
          a.nome_fantasia > b.nome_fantasia ? 1 : -1
        );
      },
    });
  }

  adicionar() {
    const usuario = this.service.getUsuarioLogado();

    this.dialog.open(ClienteDialogComponent, {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: "100%",
      disableClose: true,
      hasBackdrop: true,
      data: {
        clienteId: usuario?.cliente_id,
      },
    });
  }

  editar(cliente: Cliente) {
    const usuario = this.service.getUsuarioLogado();

    this.dialog.open(ClienteDialogComponent, {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: "100%",
      disableClose: true,
      hasBackdrop: true,
      data: {
        clienteId: usuario?.cliente_id,
        cliente,
      },
    });
  }

  async status(cliente: Cliente) {
    const status = cliente.status === "ATIVO" ? "INATIVO" : "ATIVO";

    await this.service.updateDOcument("clientes", cliente.uid, { status });
  }
}
