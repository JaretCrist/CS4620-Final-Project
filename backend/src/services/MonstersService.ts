import { Monster, MonsterShort } from "../../../types";
import knex from "../knex";

export async function selectAllMonsters(): Promise<MonsterShort[]> {
  const res = await knex<MonsterShort>("monsters").select(
    "id as monsterId",
    "name as monsterName",
    "type",
    "ac",
    "hp",
    "cr"
  );
  return res;
}

export async function createMonster(newMonster: Monster): Promise<void> {
  await knex.insert(newMonster).into("Monsters");
}

// Return everything from Monster joined with source name
export async function selectSingleMonster(
  targetId: number
): Promise<Monster[]> {
  const res = await knex<Monster>("monsters")
    .join("sources", "monsters.source", "sources.id")
    .select("monsters.*", "sources.name as sourceName")
    .where({ "monsters.id": targetId });

  return res;
}

export async function deleteMonster(targetId: number): Promise<void> {
  await knex<Monster>("monsters")
    .where({
      id: targetId,
    })
    .del();
}
