import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MonsterShort } from '../../../../../types';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { FilterDialogComponent } from 'src/app/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-monster-table',
  templateUrl: './monster-table.component.html',
  styleUrls: ['./monster-table.component.scss'],
})
export class MonsterTableComponent implements OnChanges {
  @Input() monsters: MonsterShort[] = [];
  displayedMonsterList: MonsterShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.displayedMonsterList = this.monsters;
  }

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/monsters/${id}`);
    }
  }

  filter(filterKey: string): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe((search: string) => {
      if (search) {
        this.displayedMonsterList = this.displayedMonsterList.filter(
          (monster) => {
            if (monster.monsterId === -1) {
              return true;
            }
            if (Object.keys(monster).includes(filterKey)) {
              const value = (monster as { [key: string]: any })[filterKey];
              if (value) {
                return value.toLowerCase().includes(search.toLowerCase());
              }
            }
            return false;
          }
        );
      }
    });
  }

  resetFilters(): void {
    this.displayedMonsterList = this.monsters;
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
