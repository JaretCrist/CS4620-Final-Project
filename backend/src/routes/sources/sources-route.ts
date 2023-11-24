import { SourcesController } from "./controller";
import joi from "joi";

const sourcesHandler = new SourcesController();

export const routes = [
  {
    method: "GET",
    path: "/sources",
    options: {
      tags: ["api"],
      description: "Return all source books",
      validate: {},
    },
    handler: sourcesHandler.getAll,
  },
  {
    method: "GET",
    path: "/sources/{id}",
    options: {
      tags: ["api"],
      description: "Return source book by id",
      validate: {
        params: joi.object({
          id: joi.number(),
        }),
      },
    },
    handler: sourcesHandler.getById,
  },
  {
    method: "PUT",
    path: "/sources",
    options: {
      tags: ["api"],
      description: "Return all source books",
      validate: {},
    },
    handler: sourcesHandler.addNew,
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
    handler: sourcesHandler.deleteById,
  },
];
