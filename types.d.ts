export interface Source extends Partial<SpellShort>, Partial<MonsterShort> {
  id: number;
  name: string;
  publisher: string;
  date: string;
  photo_url: string;
}

export interface Spell {
  id: number;
  name: string;
  source: number;
  school: string;
  casting_time: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string;
  sourceName?: string;
}

export interface SpellShort {
  spellId: number;
  spellName: string;
  school: string;
  castingTime: string;
}

export interface Monster {
  id: number;
  name: string;
  type: string;
  actions: string;
  ac: string;
  hp: string;
  spd: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  extras: string;
  senses: string;
  languages: string;
  cr: string;
  source: number;
  image: string;
  sourceName?: string;
}

export interface MonsterShort {
  monsterId: number;
  monsterName: string;
  type: string;
  ac: string;
  hp: string;
  cr: string;
}
