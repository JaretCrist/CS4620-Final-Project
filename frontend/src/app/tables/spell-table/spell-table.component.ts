import { Component, Input } from '@angular/core';
import { SpellShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-spell-table',
  templateUrl: './spell-table.component.html',
  styleUrls: ['./spell-table.component.scss'],
})
export class SpellTableComponent {
  @Input() spells: SpellShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  navigate(id: number): void {
    this.router.navigateByUrl(`/spells/${id}`);
  }

  deleteSpell(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient
          .delete(`http://localhost:3000/spells/${id}`)
          .subscribe();
        this.spells = this.spells.filter((spell) => spell.spellId !== id);
      }
    });
  }
}
