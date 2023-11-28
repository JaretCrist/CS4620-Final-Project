import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs';
import { MonsterShort, Source, SpellShort } from '../../../../../types';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
})
export class SourceComponent implements OnInit {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  sourceInfo: Source[] = [];
  isLoaded = false;
  sourceId = '-1';
  error?: string = undefined;

  viewMode: 'spells' | 'monsters' | 'races' | 'items' = 'spells';

  spells: SpellShort[] = [];
  monsters: MonsterShort[] = [];
  races = [];
  items = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('sourceId') ? true : false)),
        mergeMap((params) => {
          const id = params.get('sourceId');
          if (id) {
            this.sourceId = id;
            return this.httpClient.get<Source[]>(
              `http://localhost:3000/sources/${id}`
            );
          }
          throw new Error('Could not get id from parameters');
        }),
        tap((data) => {
          if (data.length === 0) {
            this.error = `Failed to get information for source: ${this.sourceId}`;
          }
          this.sourceInfo = data;
          this.collectChildren();
        })
      )
      .subscribe(() => (this.isLoaded = true));
  }

  collectChildren(): void {
    const spellHeader: SpellShort = {
      spellId: -1,
      spellName: 'NAME',
      school: 'SCHOOL',
      castingTime: 'CASTING TIME',
    };

    this.spells = this.sourceInfo
      .filter((value) => value.spellId)
      .map((source) => {
        if (source.spellId) {
          return {
            spellId: source.spellId,
            spellName: source.spellName ?? '',
            school: source.school ?? '',
            castingTime: source.castingTime ?? '',
          };
        }
        throw new Error('Spells: Child element missing properties');
      });

    if (this.spells.length > 0) {
      this.spells = [spellHeader].concat(this.spells);
    }

    this.monsters = this.sourceInfo
      .filter((value) => value.monsterId)
      .map((source) => {
        if (source.monsterId) {
          return {
            monsterId: source.monsterId,
            monsterName: source.monsterName ?? '',
            type: source.type ?? '',
            ac: source.ac ?? '',
            hp: source.cr ?? '',
            cr: source.cr ?? '',
          };
        }
        throw new Error('Monsters: Child element missing properties');
      });

    const monsterHeader: MonsterShort = {
      monsterId: -1,
      monsterName: 'NAME',
      type: 'TYPE',
      cr: 'CR',
      ac: 'AC',
      hp: 'HP',
    };

    if (this.monsters.length > 0) {
      this.monsters = [monsterHeader].concat(this.monsters);
    }
  }
}
