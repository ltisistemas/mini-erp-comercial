import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './domain/presentation/share.component';
import { ShareControllerService } from './domain/controller/share-controller.service';
import { ShareRoutingModule } from './share-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ShareRoutingModule],
  declarations: [ShareComponent],
  providers: [ShareControllerService],
})
export class ShareModule {}
