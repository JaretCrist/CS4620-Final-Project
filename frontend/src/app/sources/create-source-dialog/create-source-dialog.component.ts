import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-source-dialog',
  templateUrl: './create-source-dialog.component.html',
  styleUrls: ['./create-source-dialog.component.scss'],
})
export class CreateSourceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateSourceDialogComponent>,
    private fb: FormBuilder
  ) {}

  source = this.fb.group({
    name: ['', [Validators.required]],
    publisher: [''],
    date: [''],
    photo_url: [''],
  });

  create(): void {
    if (this.source.valid) this.dialogRef.close(this.source.value);
  }
}
