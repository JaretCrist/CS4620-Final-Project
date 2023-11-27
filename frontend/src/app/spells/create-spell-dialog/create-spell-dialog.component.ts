import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-spell-dialog',
  templateUrl: './create-spell-dialog.component.html',
  styleUrls: ['./create-spell-dialog.component.scss'],
})
export class CreateSpellDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateSpellDialogComponent>,
    private fb: FormBuilder
  ) {}

  spell = this.fb.group({
    name: ['', [Validators.required]],
    source: [0, [Validators.required]],
    school: [''],
    casting_time: [''],
    range: [''],
    components: [''],
    duration: [''],
    description: [''],
    classes: [''],
  });

  create(): void {
    if (this.spell.valid) {
      // Remove newlines from description
      this.spell.value.description = this.spell.value.description?.replace(
        '\n',
        '|||'
      );

      this.dialogRef.close(this.spell.value);
    }
  }
}
