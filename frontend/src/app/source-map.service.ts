import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SourceMapService {
  // Map of sourceId to sourceName
  sourceMap = new Map<number, string>();

  setMap(map: Map<number, string>) {
    this.sourceMap = map;
  }

  getMap(): Map<number, string> {
    return this.sourceMap;
  }

  getSourceName(sourceId: number): string {
    return this.sourceMap.get(sourceId) || '';
  }
}
