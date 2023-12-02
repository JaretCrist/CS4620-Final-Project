import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
})
export class CreateItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    private fb: FormBuilder
  ) {}

  item = this.fb.group({
    name: ['', [Validators.required]],
    source: [0, [Validators.required]],
    type: [''],
    description: [''],
  });

  create(): void {
    if (this.item.valid) {
      // Remove newlines from description
      this.item.value.description = this.item.value.description?.replace(
        '\n',
        '|||'
      );

      this.dialogRef.close(this.item.value);
    }
  }
}
