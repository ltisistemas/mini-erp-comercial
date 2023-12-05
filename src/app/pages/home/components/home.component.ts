import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UsuarioLogado } from "src/app/shared/entities/usuario-logado";
import { MatDialog } from "@angular/material/dialog";
import { ClientesComponent } from "../../clientes/components/clientes.component";
import { UsuarioLogadoUsecaseService } from "src/app/shared/use-cases/usuario-logado-usecase.service";
import { ProdutosComponent } from "../../produtos/components/produto/produtos.component";
import { UtilsService } from "src/app/shared/utils/utils.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  isLogged = false;
  currentApplicationVersion = environment.appVersion;

  usuarioLogado: UsuarioLogado;
  title = "LTI PDV";
  tituloAlterado = false;

  menuItens = [
    {
      route: "/",
      icon: "home",
      label: "Pagina inicial",
      visible: true,
    },
    {
      route: "clientes",
      icon: "contact_page",
      label: "Clientes",
      visible: true,
    },
    {
      route: "fornecedores",
      icon: "contact_page",
      label: "Fornecedores",
      visible: true,
    },
    {
      route: "usuarios",
      icon: "group",
      label: "Usuários",
      visible: true,
    },
    {
      route: "usuarios-fornecedor",
      icon: "group",
      label: "Usuários Fornecedor",
      visible: true,
    },
    // {
    //   route: 'minhas-cotacoes',
    //   icon: 'post_add',
    //   label: 'Minhas Cotações',
    //   visible: true,
    // },
    {
      route: "login",
      icon: "logout",
      label: "Sair",
      visible: true,
    },
  ];

  get visibleMenu() {
    return this.menuItens.filter((f) => f.visible);
  }

  constructor(
    private router: Router,
    private usuarioLogadoService: UsuarioLogadoUsecaseService,
    private utils: UtilsService
  ) {
    this.usuarioLogado = this.usuarioLogadoService.buscarUsuarioLogado();

    const token = localStorage.getItem(environment.storage.token);
    this.isLogged = !!!(token === null);
  }

  ngOnInit() {
    this.utils.setSize();
  }

  go(route: string, drawer?: any) {
    this.router.navigateByUrl(route);
    if (drawer) drawer.toggle();
  }

  abrirModalCliente() {
    this.utils.abrirModal({
      component: ClientesComponent,
      data: {},
    });
  }
  abrirModalProdutos() {
    this.utils.abrirModal({
      component: ProdutosComponent,
      data: {},
    });
  }
}
