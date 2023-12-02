import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { ItemsController } from "./controller";
import joi from "joi";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/items",
    options: {
      tags: ["api"],
      description: "Return all items",
      validate: {},
    },
    handler: new ItemsController().getAll,
  },
  {
    method: "PUT",
    path: "/items",
    options: {
      tags: ["api"],
      description: "Add new item",
      validate: {
        payload: joi.object({
          name: joi.string(),
          source: joi.number(),
          type: joi.string().optional(),
          description: joi.string().optional(),
        }),
      },
    },
    handler: new ItemsController().addNew,
  },
  {
    method: "GET",
    path: "/items/{id}",
    options: {
      tags: ["api"],
      description: "Get item by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new ItemsController().getById,
  },
  {
    method: "DELETE",
    path: "/items/{id}",
    options: {
      tags: ["api"],
      description: "Delete item by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new ItemsController().deleteById,
  },
];
