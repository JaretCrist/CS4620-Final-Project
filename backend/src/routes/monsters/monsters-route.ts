import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { MonstersController } from "./controller";
import joi from "joi";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/monsters",
    options: {
      tags: ["api"],
      description: "Return all Monsters",
      validate: {},
    },
    handler: new MonstersController().getAll,
  },
  {
    method: "PUT",
    path: "/monsters",
    options: {
      tags: ["api"],
      description: "Add new Monster",
      validate: {
        payload: joi.object({
          name: joi.string(),
          type: joi.string().optional(),
          actions: joi.string().optional(),
          ac: joi.string().optional(),
          hp: joi.string().optional(),
          spd: joi.string().optional(),
          str: joi.string().optional(),
          dex: joi.string().optional(),
          con: joi.string().optional(),
          int: joi.string().optional(),
          wis: joi.string().optional(),
          cha: joi.string().optional(),
          extras: joi.string().optional(),
          senses: joi.string().optional(),
          languages: joi.string().optional(),
          cr: joi.string().optional(),
          source: joi.number(),
          image: joi.string().optional(),
        }),
      },
    },
    handler: new MonstersController().addNew,
  },
  {
    method: "GET",
    path: "/monsters/{id}",
    options: {
      tags: ["api"],
      description: "Get Monster by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new MonstersController().getById,
  },
  {
    method: "DELETE",
    path: "/monsters/{id}",
    options: {
      tags: ["api"],
      description: "Delete Monster by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new MonstersController().deleteById,
  },
];
