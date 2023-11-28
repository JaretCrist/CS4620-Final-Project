import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs';
import { Spell } from '../../../../../types';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
})
export class SpellComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  spellInfo: Spell[] = [];
  isLoaded = false;
  spellId = '-1';
  error?: string = undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('spellId') ? true : false)),
        mergeMap((params) => {
          const id = params.get('spellId');
          if (id) {
            this.spellId = id;
            return this.httpClient.get<Spell[]>(
              `http://localhost:3000/spells/${id}`
            );
          }
          throw new Error('Could not get id from parameters');
        }),
        tap((data) => {
          if (data.length === 0) {
            this.error = `Failed to get information for spell: ${this.spellId}`;
          }
          this.spellInfo = data;
        })
      )
      .subscribe(() => (this.isLoaded = true));
  }

  navigateToSource(id: number) {
    this.router.navigateByUrl(`/sources/${id}`);
  }
}
