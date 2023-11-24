import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareControllerService } from '../controller/share-controller.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  listaId: string | null = null;
  usuarioId: string | null = null;
  listaAtualNome = '';
  usuarioEnvioNome = '';
  processando = false;

  constructor(
    private active: ActivatedRoute,
    private controller: ShareControllerService
  ) {
    this.active.queryParams.subscribe((param) => {
      const id = (param as any).id;
      const usuarioId = (param as any).usuario_id;

      if (id) {
        this.listaId = id;
      }

      if (usuarioId) {
        this.usuarioId = usuarioId;
      }
    });
  }

  ngOnInit() {
    this.controller.init(this);
  }

  goLista = () => this.controller.goLista(this);
}
