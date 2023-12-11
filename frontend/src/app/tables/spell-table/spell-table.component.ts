import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SpellShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { FilterDialogComponent } from 'src/app/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-spell-table',
  templateUrl: './spell-table.component.html',
  styleUrls: ['./spell-table.component.scss'],
})
export class SpellTableComponent implements OnChanges {
  @Input() spells: SpellShort[] = [];
  displayedSpellList: SpellShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.displayedSpellList = this.spells;
  }

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/spells/${id}`);
    }
  }

  filter(filterKey: string): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe((search: string) => {
      if (search) {
        this.displayedSpellList = this.displayedSpellList.filter((spell) => {
          if (spell.spellId === -1) {
            return true;
          }
          if (Object.keys(spell).includes(filterKey)) {
            const value = (spell as { [key: string]: any })[filterKey];
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
    this.displayedSpellList = this.spells;
  }

  deleteSpell(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient
          .delete(`http://localhost:3000/spells/${id}`)
          .subscribe();
        this.spells = this.spells.filter((spell) => spell.spellId !== id);
        this.displayedSpellList = this.displayedSpellList.filter(
          (spell) => spell.spellId !== id
        );
      }
    });
  }
}
