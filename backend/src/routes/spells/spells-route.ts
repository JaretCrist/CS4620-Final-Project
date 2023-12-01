import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { SpellsController } from "./controller";
import joi from "joi";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/spells",
    options: {
      tags: ["api"],
      description: "Return all spells",
      validate: {},
    },
    handler: new SpellsController().getAll,
  },
  {
    method: "PUT",
    path: "/spells",
    options: {
      tags: ["api"],
      description: "Add new spell",
      validate: {
        payload: joi.object({
          name: joi.string(),
          source: joi.number(),
          school: joi.string().optional(),
          casting_time: joi.string().optional(),
          range: joi.string().optional(),
          components: joi.string().optional(),
          duration: joi.string().optional(),
          description: joi.string().optional(),
          classes: joi.string().optional(),
        }),
      },
    },
    handler: new SpellsController().addNew,
  },
  {
    method: "GET",
    path: "/spells/{id}",
    options: {
      tags: ["api"],
      description: "Get spell by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new SpellsController().getById,
  },
  {
    method: "DELETE",
    path: "/spells/{id}",
    options: {
      tags: ["api"],
      description: "Delete spell by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new SpellsController().deleteById,
  },
];
