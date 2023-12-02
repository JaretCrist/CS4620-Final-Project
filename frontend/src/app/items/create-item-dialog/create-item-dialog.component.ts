import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SourceMapService } from 'src/app/source-map.service';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
})
export class CreateItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    private fb: FormBuilder,
    private sourceMapService: SourceMapService
  ) {}

  item = this.fb.group({
    name: ['', [Validators.required]],
    source: [2, [Validators.required]],
    type: [''],
    description: [''],
  });

  sources: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.sourceMapService.getMap().forEach((name, id) => {
      this.sources.push({ id, name });
    });
  }

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
