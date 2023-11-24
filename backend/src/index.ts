import { createAndRunServer } from "./services/HapiService";

const init = async () => {
  // config for Knex
  createAndRunServer();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
