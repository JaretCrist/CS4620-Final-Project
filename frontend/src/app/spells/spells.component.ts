import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Spell, SpellShort } from '../../../../types';
import { catchError, finalize, of, tap } from 'rxjs';
import { CreateSpellDialogComponent } from './create-spell-dialog/create-spell-dialog.component';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  isLoaded = false;
  error?: string = undefined;
  spellList: SpellShort[] = [
    {
      spellId: -1,
      spellName: 'NAME',
      school: 'SCHOOL',
      castingTime: 'CASTING TIME',
    },
  ];

  ngOnInit(): void {
    this.httpClient
      .get<SpellShort[]>('http://localhost:3000/spells')
      .pipe(
        tap((results: SpellShort[]) => {
          this.spellList = this.spellList.concat(results);
        }),
        catchError((error) => {
          console.log(error);
          this.error = `Failed to load spells: ${error.message}`;
          return of();
        }),
        finalize(() => (this.isLoaded = true))
      )
      .subscribe();
  }

  createSpell = () => {
    const dialogRef = this.dialog.open(CreateSpellDialogComponent);

    dialogRef.afterClosed().subscribe((newSpell: Spell) => {
      if (newSpell) {
        const cleanSpell = Object.fromEntries(
          Object.entries(newSpell).filter(([_, value]) => value !== '')
        );

        this.httpClient
          .put<{ id: number }>('http://localhost:3000/spells', cleanSpell)
          .subscribe((data) => {
            this.spellList.push({
              spellId: data.id,
              spellName: newSpell.name,
              castingTime: newSpell.casting_time,
              school: newSpell.school,
            });
          });
      }
    });
  };
}
