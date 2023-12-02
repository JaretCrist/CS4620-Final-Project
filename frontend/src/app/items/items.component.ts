import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item, ItemShort } from '../../../types';
import { catchError, finalize, of, tap } from 'rxjs';
import { CreateItemDialogComponent } from './create-item-dialog/create-item-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(private httpClient: HttpClient, public dialog: MatDialog) {}

  isLoaded = false;
  error?: string = undefined;
  itemList: ItemShort[] = [
    {
      itemId: -1,
      itemName: 'NAME',
      itemType: 'ITEM TYPE',
    },
  ];

  ngOnInit(): void {
    this.httpClient
      .get<ItemShort[]>('http://localhost:3000/items')
      .pipe(
        tap((results: ItemShort[]) => {
          this.itemList = this.itemList.concat(results);
        }),
        catchError((error) => {
          console.log(error);
          this.error = `Failed to load items: ${error.message}`;
          return of();
        }),
        finalize(() => (this.isLoaded = true))
      )
      .subscribe();
  }

  createItem = () => {
    const dialogRef = this.dialog.open(CreateItemDialogComponent);

    dialogRef.afterClosed().subscribe((newItem: Item) => {
      if (newItem) {
        const cleanItem = Object.fromEntries(
          Object.entries(newItem).filter(([_, value]) => value !== '')
        );

        this.httpClient
          .put<{ id: number }>('http://localhost:3000/items', cleanItem)
          .subscribe((data) => {
            this.itemList.push({
              itemId: data.id,
              itemName: newItem.name,
              itemType: newItem.type,
            });
          });
      }
    });
  };
}
