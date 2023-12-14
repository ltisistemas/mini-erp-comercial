import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LtiLoadingService {
  $show: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.$show.next(false);
  }
}
