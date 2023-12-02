import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Source } from '../../../types';
import { catchError, of, tap } from 'rxjs';
import { SourceMapService } from './source-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DnD Database';

  constructor(
    private httpClient: HttpClient,
    private sourceMapService: SourceMapService
  ) {}

  ngOnInit() {
    this.httpClient
      .get<Source[]>('http://localhost:3000/sources')
      .pipe(
        tap((results: Source[]) => {
          const sourceMap = new Map<number, string>();

          results.forEach((source) => {
            sourceMap.set(source.id, source.name);
          });

          this.sourceMapService.setMap(sourceMap);
        }),
        catchError((error) => {
          console.log(error);
          return of();
        })
      )
      .subscribe();
  }
}
