import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { Item } from "../../../../types";
import * as itemsService from "../../services/ItemsService";

export class ItemsController {
  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const res = await itemsService.selectAllItems();
      return h.response(res).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const newItem = request.payload as Item;
      const id = await itemsService.createItem(newItem);

      return h.response({ id: id }).code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async getById(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const id = request.params.id;
      const res = await itemsService.selectSingleItem(id);
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
      await itemsService.deleteItem(id);
      return h
        .response({ message: `Successfully deleted record: ${id}` })
        .code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }
}
