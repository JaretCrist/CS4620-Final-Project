import { Component, Input, OnChanges } from '@angular/core';
import { RaceShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { FilterDialogComponent } from 'src/app/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-race-table',
  templateUrl: './race-table.component.html',
  styleUrls: ['./race-table.component.scss'],
})
export class RaceTableComponent implements OnChanges {
  @Input() races: RaceShort[] = [];
  displayedRaceList: RaceShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.displayedRaceList = this.races;
  }

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/races/${id}`);
    }
  }

  filter(filterKey: string): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe((search: string) => {
      if (search) {
        this.displayedRaceList = this.displayedRaceList.filter((race) => {
          if (race.raceId === -1) {
            return true;
          }
          if (Object.keys(race).includes(filterKey)) {
            const value = (race as { [key: string]: any })[filterKey];
            if (value) {
              return value.toLowerCase().includes(search.toLowerCase());
            }
          }
          return false;
        });
      }
    });
  }

  resetFilters(): void {
    this.displayedRaceList = this.races;
  }

  deleteRace(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient.delete(`http://localhost:3000/races/${id}`).subscribe();
        this.races = this.races.filter((race) => race.raceId !== id);
      }
    });
  }
}
