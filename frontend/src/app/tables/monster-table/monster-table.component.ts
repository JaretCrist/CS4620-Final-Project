import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MonsterShort } from '../../../../../types';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-monster-table',
  templateUrl: './monster-table.component.html',
  styleUrls: ['./monster-table.component.scss'],
})
export class MonsterTableComponent {
  @Input() monsters: MonsterShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  navigate(id: number): void {
    this.router.navigateByUrl(`/monsters/${id}`);
  }

  deleteMonster(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient
          .delete(`http://localhost:3000/monsters/${id}`)
          .subscribe();
        this.monsters = this.monsters.filter(
          (monster) => monster.monsterId !== id
        );
      }
    });
  }
}
