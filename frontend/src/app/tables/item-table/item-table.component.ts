import { Component, Input } from '@angular/core';
import { ItemShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
})
export class ItemTableComponent {
  @Input() items: ItemShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/items/${id}`);
    }
  }

  deleteItem(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient.delete(`http://localhost:3000/items/${id}`).subscribe();
        this.items = this.items.filter((item) => item.itemId !== id);
      }
    });
  }
}
