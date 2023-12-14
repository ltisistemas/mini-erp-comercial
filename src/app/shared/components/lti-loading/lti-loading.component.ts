import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { LtiLoadingService } from "../../services/lti-loading.service";

@Component({
  selector: "app-lti-loading",
  templateUrl: "./lti-loading.component.html",
  styleUrls: ["./lti-loading.component.scss"],
})
export class LtiLoadingComponent implements OnInit, OnChanges {
  @Input()
  message: string | undefined = "Carregando informações...aguarde";

  private _show = false;
  get show() {
    return this._show;
  }

  constructor(private loadingService: LtiLoadingService) {
    this.loadingService.$show.next(false);
    this.loadingService.$show.asObservable().subscribe((state) => {
      this._show = state;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes["show"] && changes["show"].currentValue) {
    //   this.loadingService.$show.next(changes["show"].currentValue);
    // }
  }

  ngOnInit() {}
}
