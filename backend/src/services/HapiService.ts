import { Server, ResponseObject } from "@hapi/hapi";
import { Boom } from "@hapi/boom";
import { routes as sourcesRoutes } from "../routes/sources/sources-route";

export async function createAndRunServer(): Promise<void> {
  const server = new Server({
    port: 3000,
    host: "localhost",
  });

  server.route(sourcesRoutes);
  // server.route(spellssRoutes);
  // server.route(monstersRoutes);
  // server.route(racesRoutes);
  // server.route(itemsRoutes);

  preResponse(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

/**
 * Add functions to occur after the response is generated but before it hits the client
 * @param server The Hapi server
 */
function preResponse(server: Server): void {
  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    if (response instanceof Boom) {
      console.log(
        `Error response for ${request.method.toUpperCase()} ${request.url}: ${
          response.message
        } (Status Code: ${response.output.statusCode})`
      );
    } else {
      console.log(
        `${request.method.toUpperCase()} ${request.url} (${
          response.statusCode
        })`
      );
    }
    return h.continue;
  });
}
