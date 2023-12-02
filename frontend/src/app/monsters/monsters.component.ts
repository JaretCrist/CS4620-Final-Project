import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Monster, MonsterShort } from '../../../types';
import { catchError, finalize, of, tap } from 'rxjs';
import { CreateMonsterDialogComponent } from './create-monster-dialog/create-monster-dialog.component';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss'],
})
export class MonstersComponent implements OnInit {
  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  isLoaded = false;
  error?: string = undefined;
  monsterList: MonsterShort[] = [
    {
      monsterId: -1,
      monsterName: 'NAME',
      type: 'TYPE',
      ac: 'AC',
      hp: 'HP',
      cr: 'CR',
    },
  ];

  ngOnInit(): void {
    this.httpClient
      .get<MonsterShort[]>('http://localhost:3000/monsters')
      .pipe(
        tap((results: MonsterShort[]) => {
          this.monsterList = this.monsterList.concat(results);
        }),
        catchError((error) => {
          console.log(error);
          this.error = `Failed to load monsters: ${error.message}`;
          return of();
        }),
        finalize(() => (this.isLoaded = true))
      )
      .subscribe();
  }

  createMonster = () => {
    const dialogRef = this.dialog.open(CreateMonsterDialogComponent);

    dialogRef.afterClosed().subscribe((newmonster: Monster) => {
      if (newmonster) {
        const cleanMonster = Object.fromEntries(
          Object.entries(newmonster).filter(([_, value]) => value !== '')
        );

        this.httpClient
          .put<{ id: number }>('http://localhost:3000/monsters', cleanMonster)
          .subscribe((data) => {
            this.monsterList.push({
              monsterId: data.id,
              monsterName: newmonster.name,
              type: newmonster.type,
              ac: newmonster.ac,
              hp: newmonster.hp,
              cr: newmonster.cr,
            });
          });
      }
    });
  };
}
