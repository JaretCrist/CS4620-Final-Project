import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Monster } from "../../../types";
import * as monstersService from "../../services/MonstersService";

export class MonstersController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await monstersService.selectAllMonsters();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newMonster = request.payload as Monster;
      const id = await monstersService.createMonster(newMonster);

      return h.response({ id: id }).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      const res = await monstersService.selectSingleMonster(id);
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
      await monstersService.deleteMonster(id);
      return h
        .response({ message: `Successfully deleted record: ${id}` })
        .code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
