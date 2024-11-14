import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CdkMenuModule } from '@angular/cdk/menu';
import CssColors from 'src/common/css-colors.enum';
import { CommonModule } from '@angular/common';
import { CreateCollectionGQL } from 'src/generated/graphql';
import { firstValueFrom } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { IconButtonComponent } from 'src/common/components/icon-button/icon-button.component';
import { TranslateColorPipe } from 'src/common/pipes/translate-colors.pipe';

@Component({
  standalone: true,
  selector: 'app-new-collection',
  imports: [
    CommonModule,
    IconButtonComponent,
    ReactiveFormsModule,
    CdkMenuModule,
    TranslateColorPipe,
  ],
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss'],
})
export class NewCollectionComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl(CssColors.Blue, Validators.required),
  });

  constructor(
    private readonly createCollectionGQL: CreateCollectionGQL,
    private readonly matDialogRef: MatDialogRef<NewCollectionComponent>
  ) {}

  setColor(color: CssColors) {
    this.form.controls.color.setValue(color);
  }

  close() {
    this.matDialogRef.close();
  }

  async createCollection() {
    if (this.form.invalid) return;
    await firstValueFrom(this.createCollectionGQL.mutate({
      input: {
        name: this.form.controls.name.value!,
        color: this.form.controls.color.value!,
      },
    }));
    this.close();
  }

  get colors() {
    return Object.values(CssColors);
  }
}
