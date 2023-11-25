import { Source } from "../types/types";
import knex from "../knex";

export async function selectAllSources(): Promise<Source[]> {
  const res = await knex<Source>("sources");
  return res;
}

export async function createSource(newSource: Source): Promise<void> {
  await knex.insert(newSource).into("sources");
}

export async function selectSingleSource(targetId: number): Promise<Source[]> {
  const res = await knex<Source>("sources").where({
    id: targetId,
  });
  return res;
}

export async function deleteSource(targetId: number): Promise<void> {
  await knex<Source>("sources")
    .where({
      id: targetId,
    })
    .del();
}
