import { Item, ItemShort } from "../../types";
import knex from "../knex";

export async function selectAllItems(): Promise<ItemShort[]> {
  const res = await knex<ItemShort>("items").select(
    "id as itemId",
    "name as itemName",
    "type as itemType"
  );
  return res;
}

export async function createItem(newitem: Item): Promise<number> {
  const id = await knex.insert(newitem).into("items");
  return id[0];
}

// Return everything from item joined with source name
export async function selectSingleItem(targetId: number): Promise<Item[]> {
  const res = await knex<Item>("items")
    .join("sources", "items.source", "sources.id")
    .select("items.*", "sources.name as sourceName")
    .where({ "items.id": targetId });

  return res;
}

export async function deleteItem(targetId: number): Promise<void> {
  await knex<Item>("items")
    .where({
      id: targetId,
    })
    .del();
}
