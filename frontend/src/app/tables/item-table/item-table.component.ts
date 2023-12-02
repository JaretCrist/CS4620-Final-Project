import { Component, Input, OnChanges } from '@angular/core';
import { ItemShort } from '../../../../../types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { FilterDialogComponent } from 'src/app/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
})
export class ItemTableComponent implements OnChanges {
  @Input() items: ItemShort[] = [];
  displayedItemList: ItemShort[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnChanges(): void {
    this.displayedItemList = this.items;
  }

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/items/${id}`);
    }
  }

  filter(filterKey: string): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe((search: string) => {
      if (search) {
        this.displayedItemList = this.displayedItemList.filter((item) => {
          if (item.itemId === -1) {
            return true;
          }
          if (Object.keys(item).includes(filterKey)) {
            const value = (item as { [key: string]: any })[filterKey];
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
    this.displayedItemList = this.items;
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
