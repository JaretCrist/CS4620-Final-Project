import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Spell } from "../../../types";
import * as spellsService from "../../services/SpellsService";

export class SpellsController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await spellsService.selectAllSpells();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newSpell = request.payload as Spell;
      const id = await spellsService.createSpell(newSpell);

      return h.response({ id: id }).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      const res = await spellsService.selectSingleSpell(id);
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
      await spellsService.deleteSpell(id);
      return h
        .response({ message: `Successfully deleted record: ${id}` })
        .code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
