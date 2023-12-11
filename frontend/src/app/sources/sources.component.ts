import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';
import { Source } from '../../../../types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateSourceDialogComponent } from './create-source-dialog/create-source-dialog.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { SourceMapService } from '../source-map.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
})
export class SourcesComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private sourceMapService: SourceMapService
  ) {}

  isLoaded = false;
  error?: string = undefined;
  sourceList: Source[] = [
    {
      id: -1,
      name: 'TITLE',
      publisher: 'PUBLISHER',
      date: 'RELEASE DATE',
      photo_url: 'ART',
    },
  ];

  displayedSourceList: Source[] = [];

  filter(filterKey: string): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe((search: string) => {
      if (search) {
        this.displayedSourceList = this.displayedSourceList.filter((source) => {
          if (source.id === -1) {
            return true;
          }
          if (Object.keys(source).includes(filterKey)) {
            const value = (source as { [key: string]: any })[filterKey];
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
    this.displayedSourceList = this.sourceList;
  }

  ngOnInit(): void {
    this.httpClient
      .get<Source[]>('http://localhost:3000/sources')
      .pipe(
        tap((results: Source[]) => {
          this.sourceList = this.sourceList.concat(results);
          this.displayedSourceList = this.sourceList;
        }),
        catchError((error) => {
          console.log(error);
          this.error = `Failed to load sources: ${error.message}`;
          return of();
        }),
        finalize(() => (this.isLoaded = true))
      )
      .subscribe();
  }

  navigate(id: number): void {
    if (id !== -1) {
      this.router.navigateByUrl(`/sources/${id}`);
    }
  }

  deleteSource(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient
          .delete(`http://localhost:3000/sources/${id}`)
          .subscribe();
        this.sourceList = this.sourceList.filter((source) => source.id !== id);
        this.displayedSourceList = this.displayedSourceList.filter(
          (source) => source.id !== id
        );
      }
    });
  }

  createSource = () => {
    const dialogRef = this.dialog.open(CreateSourceDialogComponent);

    dialogRef.afterClosed().subscribe((newSource: Source) => {
      if (newSource) {
        const cleanSource = Object.fromEntries(
          Object.entries(newSource).filter(([_, value]) => value !== '')
        );

        this.httpClient
          .put<{ id: number }>('http://localhost:3000/sources', cleanSource)
          .subscribe((data) => {
            console.log('DOES THIS REACH');
            newSource.id = data.id;
            this.sourceList.push(newSource);
            console.log('DOES THIS REACH 2');
            this.displayedSourceList = this.sourceList;
            console.log('HELP ME');
            this.sourceMapService.addToMap(newSource.id, newSource.name);
            console.log(this.sourceMapService.getSourceName(newSource.id));
          });
      }
    });
  };
}
