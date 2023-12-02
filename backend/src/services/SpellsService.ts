import { Spell, SpellShort } from "../../types";
import knex from "../knex";

export async function selectAllSpells(): Promise<SpellShort[]> {
  const res = await knex<SpellShort>("spells").select(
    "id as spellId",
    "name as spellName",
    "school",
    "casting_time as castingTime"
  );
  return res;
}

export async function createSpell(newspell: Spell): Promise<number> {
  const id = await knex.insert(newspell).into("spells");
  return id[0];
}

// Return everything from spell joined with source name
export async function selectSingleSpell(targetId: number): Promise<Spell[]> {
  const res = await knex<Spell>("spells")
    .join("sources", "spells.source", "sources.id")
    .select("spells.*", "sources.name as sourceName")
    .where({ "spells.id": targetId });

  return res;
}

export async function deleteSpell(targetId: number): Promise<void> {
  await knex<Spell>("spells")
    .where({
      id: targetId,
    })
    .del();
}
