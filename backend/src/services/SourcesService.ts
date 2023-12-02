import { Source } from "../../../types";
import knex from "../knex";

export async function selectAllSources(): Promise<Source[]> {
  const res = await knex<Source>("sources");
  return res;
}

export async function createSource(newSource: Source): Promise<number> {
  const id = await knex.insert(newSource).into("sources");
  return id[0];
}

// Return everything from source joined with id and name from other tables
export async function selectSingleSource(targetId: number): Promise<Source[]> {
  let res: Source[] = [];

  // Get just single source (if it has no child elements)
  res = await knex<Source>("sources").where({ id: targetId });

  const spells = await knex<Source>("sources")
    .join("spells", "sources.id", "spells.source")
    .select(
      "sources.*",
      "spells.id as spellId",
      "spells.name as spellName",
      "spells.school",
      "spells.casting_time as castingTime"
    )
    .where({ "sources.id": targetId });
  res = res.concat(spells);

  const monsters = await knex<Source>("sources")
    .join("monsters", "sources.id", "monsters.source")
    .select(
      "sources.*",
      "monsters.id as monsterId",
      "monsters.name as monsterName",
      "monsters.type",
      "monsters.ac",
      "monsters.hp",
      "monsters.cr"
    )
    .where({ "sources.id": targetId });
  res = res.concat(monsters);

  const items = await knex<Source>("sources")
    .join("items", "sources.id", "items.source")
    .select(
      "sources.*",
      "items.id as itemId",
      "items.name as itemName",
      "items.type as itemType"
    )
    .where({ "sources.id": targetId });
  res = res.concat(items);

  const races = await knex<Source>("sources")
    .join("races", "sources.id", "races.source")
    .select(
      "sources.*",
      "races.id as raceId",
      "races.name as raceName",
      "races.parent as parent",
      "sources.name as sourceName"
    )
    .where({ "sources.id": targetId });
  res = res.concat(races);

  return res;
}

export async function deleteSource(targetId: number): Promise<void> {
  await knex<Source>("sources")
    .where({
      id: targetId,
    })
    .del();
}
