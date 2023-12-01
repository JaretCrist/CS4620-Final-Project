import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { RacesController } from "./controller";
import joi from "joi";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/races",
    options: {
      tags: ["api"],
      description: "Return all races",
      validate: {},
    },
    handler: new RacesController().getAll,
  },
  {
    method: "PUT",
    path: "/races",
    options: {
      tags: ["api"],
      description: "Add new race",
      validate: {
        payload: joi.object({
          name: joi.string(),
          source: joi.number(),
          parent: joi.string().optional(),
          details: joi.string().optional(),
        }),
      },
    },
    handler: new RacesController().addNew,
  },
  {
    method: "GET",
    path: "/races/{id}",
    options: {
      tags: ["api"],
      description: "Get race by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new RacesController().getById,
  },
  {
    method: "DELETE",
    path: "/races/{id}",
    options: {
      tags: ["api"],
      description: "Delete race by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new RacesController().deleteById,
  },
];
