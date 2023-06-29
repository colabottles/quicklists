import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-form-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form [formGroup]="formGroup" (ngSubmit)="handleSave()">
        <ion-item *ngFor="let control of formGroup.controls | keyvalue">
          <ion-label position="stacked">{{ control.key}}</ion-label>
          <ion-input type="text" [formControlName]="control.key"></ion-input>
        </ion-item>
        <ion-button
          color="dark"
          expand="full"
          type="submit"
          [disabled]="!formGroup.valid"
        >
          <ion-icon slot="start" name="save-outline"></ion-icon> Save
        </ion-button>
      </form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormModalComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;

  @Output() save = new EventEmitter<boolean>();

  handleSave() {
    this.save.emit(true);
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [FormModalComponent],
  exports: [FormModalComponent],
})
export class FormModalComponentModule {}

