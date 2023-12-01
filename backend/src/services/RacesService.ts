import { Race, RaceShort } from "../../../types";
import knex from "../knex";

export async function selectAllRaces(): Promise<RaceShort[]> {
  const res = await knex<Race>("races")
    .join("sources", "races.source", "sources.id")
    .select(
      "races.id as raceId",
      "races.name as raceName",
      "races.parent as parent",
      "sources.name as sourceName"
    );
  return res;
}

export async function createRace(newrace: Race): Promise<number> {
  const id = await knex.insert(newrace).into("races");
  return id[0];
}

// Return everything from race joined with source name
export async function selectSingleRace(targetId: number): Promise<Race[]> {
  const res = await knex<Race>("races")
    .join("sources", "races.source", "sources.id")
    .select("races.*", "sources.name as sourceName")
    .where({ "races.id": targetId });

  return res;
}

export async function deleteRace(targetId: number): Promise<void> {
  await knex<Race>("races")
    .where({
      id: targetId,
    })
    .del();
}
