import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Source } from "../../types/types";
import knex from "../../knex";
import * as sourcesService from "../../services/SourcesService";

export class SourcesController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await sourcesService.selectAll();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newSource = request.payload as Source;
      await sourcesService.insertInto(newSource);

      return h.response("Successfully updated table").code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      return h.response(`get by id test: ${id}`).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async deleteById(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      return h.response(`delete by id test: ${id}`).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
