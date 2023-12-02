import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Race, RaceShort } from '../../../../types';
import { catchError, finalize, of, tap } from 'rxjs';
import { CreateRaceDialogComponent } from './create-race-dialog/create-race-dialog.component';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
})
export class RacesComponent implements OnInit {
  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  isLoaded = false;
  error?: string = undefined;
  raceList: RaceShort[] = [
    {
      raceId: -1,
      raceName: 'NAME',
      parent: 'PARENT RACE',
      sourceName: 'SOURCE',
    },
  ];

  ngOnInit(): void {
    this.httpClient
      .get<RaceShort[]>('http://localhost:3000/races')
      .pipe(
        tap((results: RaceShort[]) => {
          this.raceList = this.raceList.concat(results);
        }),
        catchError((error) => {
          console.log(error);
          this.error = `Failed to load races: ${error.message}`;
          return of();
        }),
        finalize(() => (this.isLoaded = true))
      )
      .subscribe();
  }

  createRace = () => {
    const dialogRef = this.dialog.open(CreateRaceDialogComponent);

    dialogRef.afterClosed().subscribe((newRace: Race) => {
      if (newRace) {
        const cleanRace = Object.fromEntries(
          Object.entries(newRace).filter(([_, value]) => value !== '')
        );

        this.httpClient
          .put<{ id: number }>('http://localhost:3000/races', cleanRace)
          .subscribe((data) => {
            this.raceList.push({
              raceId: data.id,
              raceName: newRace.name,
              parent: newRace.parent,
              sourceName: 'PLACEHOLDER UNTIL MAP EXISTS',
            });
          });
      }
    });
  };
}
