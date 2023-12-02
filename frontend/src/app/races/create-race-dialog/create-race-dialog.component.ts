import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SourceMapService } from 'src/app/source-map.service';

@Component({
  selector: 'app-create-race-dialog',
  templateUrl: './create-race-dialog.component.html',
  styleUrls: ['./create-race-dialog.component.scss'],
})
export class CreateRaceDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateRaceDialogComponent>,
    private fb: FormBuilder,
    private sourceMapService: SourceMapService
  ) {}

  race = this.fb.group({
    name: ['', [Validators.required]],
    source: [2, [Validators.required]],
    parent: [''],
    details: [''],
  });

  sources: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.sourceMapService.getMap().forEach((name, id) => {
      this.sources.push({ id, name });
    });
  }

  create(): void {
    if (this.race.valid) {
      // Remove newlines from details
      this.race.value.details = this.race.value.details?.replace('\n', '|||');

      this.dialogRef.close(this.race.value);
    }
  }
}
