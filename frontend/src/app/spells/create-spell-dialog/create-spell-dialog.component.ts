import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SourceMapService } from 'src/app/source-map.service';

@Component({
  selector: 'app-create-spell-dialog',
  templateUrl: './create-spell-dialog.component.html',
  styleUrls: ['./create-spell-dialog.component.scss'],
})
export class CreateSpellDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateSpellDialogComponent>,
    private fb: FormBuilder,
    private sourceMapService: SourceMapService
  ) {}

  spell = this.fb.group({
    name: ['', [Validators.required]],
    source: [2, [Validators.required]],
    school: [''],
    casting_time: [''],
    range: [''],
    components: [''],
    duration: [''],
    description: [''],
    classes: [''],
  });

  sources: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.sourceMapService.getMap().forEach((name, id) => {
      this.sources.push({ id, name });
    });
  }

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
