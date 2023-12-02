import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monster } from '../../../../types';
import { filter, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  monsterInfo: Monster[] = [];
  isLoaded = false;
  monsterId = '-1';
  error?: string = undefined;

  viewMode: 'Stats' | 'Actions' | 'Extras' = 'Stats';

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('monsterId') ? true : false)),
        mergeMap((params) => {
          const id = params.get('monsterId');
          if (id) {
            this.monsterId = id;
            return this.httpClient.get<Monster[]>(
              `http://localhost:3000/monsters/${id}`
            );
          }
          throw new Error('Could not get id from parameters');
        }),
        tap((data) => {
          if (data.length === 0) {
            this.error = `Failed to get information for monster: ${this.monsterId}`;
          }
          this.monsterInfo = data;
        })
      )
      .subscribe(() => (this.isLoaded = true));
  }

  navigateToSource(id: number) {
    this.router.navigateByUrl(`/sources/${id}`);
  }
}
