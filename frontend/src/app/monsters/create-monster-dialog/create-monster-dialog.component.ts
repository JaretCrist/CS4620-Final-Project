import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SourceMapService } from 'src/app/source-map.service';

@Component({
  selector: 'app-create-monster-dialog',
  templateUrl: './create-monster-dialog.component.html',
  styleUrls: ['./create-monster-dialog.component.scss'],
})
export class CreateMonsterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateMonsterDialogComponent>,
    private fb: FormBuilder,
    private sourceMapService: SourceMapService
  ) {}

  monster = this.fb.group({
    name: ['', [Validators.required]],
    source: [2, [Validators.required]],
    type: [''],
    ac: [''],
    hp: [''],
    spd: [''],
    str: [''],
    dex: [''],
    con: [''],
    int: [''],
    wis: [''],
    cha: [''],
    senses: [''],
    languages: [''],
    cr: [''],
    image: [''],
    actions: [''],
    extras: [''],
  });

  sources: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.sourceMapService.getMap().forEach((name, id) => {
      this.sources.push({ id, name });
    });
  }

  create(): void {
    if (this.monster.valid) {
      // Remove newlines from actions
      this.monster.value.actions = this.monster.value.actions?.replace(
        '\n',
        '|||'
      );
      // Remove newlines from extras
      this.monster.value.extras = this.monster.value.extras?.replace(
        '\n',
        '|||'
      );

      this.dialogRef.close(this.monster.value);
    }
  }
}
