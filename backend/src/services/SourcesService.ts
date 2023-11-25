import { Source } from "../types/types";
import knex from "../knex";

export async function selectAll(): Promise<Source[]> {
  const res = await knex<Source>("sources");
  return res;
}

export async function insertInto(newSource: Source): Promise<void> {
  await knex.insert(newSource).into("sources");
}
