import { Component, Input } from '@angular/core';
import { RaceShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-race-table',
  templateUrl: './race-table.component.html',
  styleUrls: ['./race-table.component.scss'],
})
export class RaceTableComponent {
  @Input() races: RaceShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/races/${id}`);
    }
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
