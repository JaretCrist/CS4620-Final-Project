import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { SourcesController } from "./controller";
import joi from "joi";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/sources",
    options: {
      tags: ["api"],
      description: "Return all source books",
      validate: {},
    },
    handler: new SourcesController().getAll,
  },
  {
    method: "PUT",
    path: "/sources",
    options: {
      tags: ["api"],
      description: "Add new source book",
      validate: {
        payload: joi.object({
          name: joi.string(),
          publisher: joi.string().optional(),
          date: joi.string().optional(),
          photo_url: joi.string().optional(),
        }),
      },
    },
    handler: new SourcesController().addNew,
  },
  {
    method: "GET",
    path: "/sources/{id}",
    options: {
      tags: ["api"],
      description: "Get source book by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new SourcesController().getById,
  },
  {
    method: "DELETE",
    path: "/sources/{id}",
    options: {
      tags: ["api"],
      description: "Delete source book by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: new SourcesController().deleteById,
  },
];
