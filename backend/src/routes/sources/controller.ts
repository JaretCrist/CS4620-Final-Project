import { Service } from "typedi";
// import { Inject, Service } from 'typedi';
import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";

@Service()
export class SourcesController {
  // @Inject()
  // private exampleService!: ExampleService;

  async getAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      return h.response("get all test").code(200);
    } catch (error) {
      return h.response((error as Error).message).code(400);
    }
  }

  async addNew(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      return h.response("add new test").code(200);
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
