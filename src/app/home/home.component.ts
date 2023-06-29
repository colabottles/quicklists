import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="formModalIsOpen$.next(true)" aria-label="Open or close modal">
            <ion-icon name="add" slot="icon-only" aria-label="Open or close modal"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal [isOpen]="formModalIsOpen$ | async" [canDismiss]="true">
        <ng-template>
          <p>I will be a form one day!</p>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  formModalIsOpen$ = new BehaviorSubject<boolean>(false);
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}
