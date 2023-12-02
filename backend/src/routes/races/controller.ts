import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Race } from "../../../types";
import * as racesService from "../../services/RacesService";

export class RacesController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await racesService.selectAllRaces();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newRace = request.payload as Race;
      const id = await racesService.createRace(newRace);

      return h.response({ id: id }).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      const res = await racesService.selectSingleRace(id);
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
      await racesService.deleteRace(id);
      return h
        .response({ message: `Successfully deleted record: ${id}` })
        .code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
