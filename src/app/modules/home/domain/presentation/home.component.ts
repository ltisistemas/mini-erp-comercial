import { Component, OnInit } from '@angular/core';
import { HomeControllerService } from '../controllers/home-controller.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  isLogged = false;
  currentApplicationVersion = environment.appVersion;

  title = 'Cota pra Mim';
  tituloAlterado = false;

  menuItens = [
    {
      route: '/',
      icon: 'home',
      label: 'Pagina inicial',
      visible: true,
    },
    {
      route: 'clientes',
      icon: 'contact_page',
      label: 'Clientes',
      visible: true,
    },
    {
      route: 'fornecedores',
      icon: 'contact_page',
      label: 'Fornecedores',
      visible: true,
    },
    {
      route: 'usuarios',
      icon: 'group',
      label: 'Usuários',
      visible: true,
    },
    {
      route: 'usuarios-fornecedor',
      icon: 'group',
      label: 'Usuários Fornecedor',
      visible: true,
    },
    // {
    //   route: 'minhas-cotacoes',
    //   icon: 'post_add',
    //   label: 'Minhas Cotações',
    //   visible: true,
    // },
    {
      route: 'login',
      icon: 'logout',
      label: 'Sair',
      visible: true,
    },
  ];

  get visibleMenu() {
    return this.menuItens.filter((f) => f.visible);
  }

  constructor(
    private controller: HomeControllerService,
    private router: Router,
    private homeService: HomeService
  ) {
    const token = localStorage.getItem(environment.storage.token);
    this.isLogged = !!!(token === null);

    this.homeService.$home.asObservable().subscribe((titulo) => {
      if (titulo !== '') {
        this.title = titulo;
        this.tituloAlterado = true;
        return;
      }

      this.title = 'Cota pra Mim';
      this.tituloAlterado = false;
    });
  }

  ngOnInit() {
    this.controller.init(this);
  }

  go(route: string, drawer?: any) {
    this.router.navigateByUrl(route);
    if (drawer) drawer.toggle();
  }

  goHome() {
    this.homeService.$home.next('');
    this.go('');
  }
}
