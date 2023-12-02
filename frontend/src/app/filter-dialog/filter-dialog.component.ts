import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    private fb: FormBuilder
  ) {}

  filter = this.fb.group({
    search: ['', [Validators.required]],
  });

  apply(): void {
    if (this.filter.valid) {
      this.dialogRef.close(this.filter.value.search);
    }
  }
}
