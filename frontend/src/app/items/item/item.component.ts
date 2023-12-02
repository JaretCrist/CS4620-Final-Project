import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs';
import { Item } from '../../../../types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  itemInfo: Item[] = [];
  isLoaded = false;
  itemId = '-1';
  error?: string = undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('itemId') ? true : false)),
        mergeMap((params) => {
          const id = params.get('itemId');
          if (id) {
            this.itemId = id;
            return this.httpClient.get<Item[]>(
              `http://localhost:3000/items/${id}`
            );
          }
          throw new Error('Could not get id from parameters');
        }),
        tap((data) => {
          if (data.length === 0) {
            this.error = `Failed to get information for item: ${this.itemId}`;
          }
          this.itemInfo = data;
        })
      )
      .subscribe(() => (this.isLoaded = true));
  }

  navigateToSource(id: number) {
    this.router.navigateByUrl(`/sources/${id}`);
  }
}
