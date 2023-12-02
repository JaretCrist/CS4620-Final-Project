import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Source } from "../../../types";
import * as sourcesService from "../../services/SourcesService";

export class SourcesController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await sourcesService.selectAllSources();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newSource = request.payload as Source;
      const id = await sourcesService.createSource(newSource);

      return h.response({ id: id }).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      const res = await sourcesService.selectSingleSource(id);
      return h.response(res).code(200);
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
      await sourcesService.deleteSource(id);
      return h
        .response({ message: `Successfully deleted record: ${id}` })
        .code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
