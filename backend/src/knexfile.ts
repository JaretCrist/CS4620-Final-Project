import path from "path";

const config = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "./dnd.db"),
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "migrations"),
  },
};

export default config;
