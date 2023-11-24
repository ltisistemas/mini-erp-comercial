import { Injectable } from '@angular/core';
import { HomeComponent } from '../presentation/home.component';

@Injectable({ providedIn: 'root' })
export class HomeControllerService {
  constructor() {}

  async init(component: HomeComponent) {}
}
