export interface Source extends Partial<SpellShort>, Parial<MonsterShort> {
  id: number;
  name: string;
  publisher: string;
  date: string;
  photoURL: string;
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

export interface MonsterShort {
  monsterId: number;
  monsterName: string;
  type: string;
  ac: string;
  hp: string;
  cr: string;
}
