import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs';
import {
  ItemShort,
  MonsterShort,
  RaceShort,
  Source,
  SpellShort,
} from '../../../../../types';

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
  races: RaceShort[] = [];
  items: ItemShort[] = [];

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

    this.races = this.sourceInfo
      .filter((value) => value.raceId)
      .map((source) => {
        if (source.raceId) {
          return {
            raceId: source.raceId,
            raceName: source.raceName ?? '',
            parent: source.parent ?? '',
            sourceName: source.sourceName ?? '',
          };
        }
        throw new Error('Races: Child element missing properties');
      });

    const raceHeader: RaceShort = {
      raceId: -1,
      raceName: 'NAME',
      parent: 'PARENT',
      sourceName: 'SOURCE',
    };

    if (this.races.length > 0) {
      this.races = [raceHeader].concat(this.races);
    }

    this.items = this.sourceInfo
      .filter((value) => value.itemId)
      .map((source) => {
        if (source.itemId) {
          return {
            itemId: source.itemId,
            itemName: source.itemName ?? '',
            itemType: source.itemType ?? '',
          };
        }
        throw new Error('Items: Child element missing properties');
      });

    const itemHeader: ItemShort = {
      itemId: -1,
      itemName: 'NAME',
      itemType: 'TYPE',
    };

    if (this.items.length > 0) {
      this.items = [itemHeader].concat(this.items);
    }
  }
}
