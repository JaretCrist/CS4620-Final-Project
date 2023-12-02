import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-race-dialog',
  templateUrl: './create-race-dialog.component.html',
  styleUrls: ['./create-race-dialog.component.scss'],
})
export class CreateRaceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateRaceDialogComponent>,
    private fb: FormBuilder
  ) {}

  race = this.fb.group({
    name: ['', [Validators.required]],
    source: [0, [Validators.required]],
    parent: [''],
    details: [''],
  });

  create(): void {
    if (this.race.valid) {
      // Remove newlines from details
      this.race.value.details = this.race.value.details?.replace('\n', '|||');

      this.dialogRef.close(this.race.value);
    }
  }
}
