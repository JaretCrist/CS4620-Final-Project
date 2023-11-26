import { Server } from "@hapi/hapi";
import { routes as sourceRoutes } from "../routes/sources/sources-route";
import { routes as spellRoutes } from "../routes/spells/spells-route";
import { routes as monsterRoutes } from "../routes/monsters/monsters-route";
import { Boom } from "@hapi/boom";

export async function init() {
  const server = new Server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(sourceRoutes);
  server.route(spellRoutes);
  server.route(monsterRoutes);

  preResponse(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

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
