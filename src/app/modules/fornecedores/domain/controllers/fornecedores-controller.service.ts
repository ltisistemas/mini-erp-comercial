import { Injectable } from '@angular/core';
import { Fornecedor } from '../entities/fornecedor';
import { FirebaseService } from 'src/app/shared/utils/firebase.service';
import { FornecedoresComponent } from '../presentation/fornecedores.component';
import { FornecedorDialogComponent } from '../presentation/components/fornecedor-dialog/domain/presentation/fornecedor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuerySnapshot } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FornecedoresControllerService {
  constructor(private service: FirebaseService, private dialog: MatDialog) {}

  init(component: FornecedoresComponent) {
    this.service.getOnSnapshotWithoutQuery({
      table_name: 'fornecedores',
      callback: (snapshot: QuerySnapshot) => {
        component.fornecedores = [];
        const fornecedores: Fornecedor[] = [];

        for (const doc of snapshot.docs) {
          const data = doc.data() as Fornecedor;
          const fornecedor = new Fornecedor({
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

          fornecedores.push(fornecedor);
        }

        component.fornecedores = fornecedores.sort((a, b) =>
          a.nome_fantasia > b.nome_fantasia ? 1 : -1
        );
      },
    });
  }

  adicionar() {
    const usuario = this.service.getUsuarioLogado();

    this.dialog.open(FornecedorDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        clienteId: usuario?.cliente_id,
      },
    });
  }

  editar(fornecedor: Fornecedor) {
    const usuario = this.service.getUsuarioLogado();

    this.dialog.open(FornecedorDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        clienteId: usuario?.cliente_id,
        fornecedor,
      },
    });
  }

  async status(fornecedor: Fornecedor) {
    const status = fornecedor.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';

    await this.service.updateDOcument('fornecedores', fornecedor.uid, {
      status,
    });
  }
}
