import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';
import { Source } from '../../../../types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateSourceDialogComponent } from './create-source-dialog/create-source-dialog.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
})
export class SourcesComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
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

  ngOnInit(): void {
    this.httpClient
      .get<Source[]>('http://localhost:3000/sources')
      .pipe(
        tap((results: Source[]) => {
          this.sourceList = this.sourceList.concat(results);
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
    this.router.navigateByUrl(`/sources/${id}`);
  }

  deleteSource(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.httpClient
          .delete(`http://localhost:3000/sources/${id}`)
          .subscribe();
        this.sourceList = this.sourceList.filter((source) => source.id !== id);
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
          .put('http://localhost:3000/sources', cleanSource)
          .subscribe(() => {
            this.sourceList.push(newSource);
          });
      }
    });
  };
}
