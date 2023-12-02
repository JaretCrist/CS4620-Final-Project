import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs';
import { Race } from '../../../../types';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  raceInfo: Race[] = [];
  isLoaded = false;
  raceId = '-1';
  error?: string = undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('raceId') ? true : false)),
        mergeMap((params) => {
          const id = params.get('raceId');
          if (id) {
            this.raceId = id;
            return this.httpClient.get<Race[]>(
              `http://localhost:3000/races/${id}`
            );
          }
          throw new Error('Could not get id from parameters');
        }),
        tap((data) => {
          if (data.length === 0) {
            this.error = `Failed to get information for race: ${this.raceId}`;
          }
          this.raceInfo = data;
        })
      )
      .subscribe(() => (this.isLoaded = true));
  }

  navigateToSource(id: number) {
    this.router.navigateByUrl(`/sources/${id}`);
  }
}
