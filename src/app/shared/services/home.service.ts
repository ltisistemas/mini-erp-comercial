import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  $home: Subject<string> = new Subject<string>();

  constructor() {
    this.$home.next('');
  }
}
