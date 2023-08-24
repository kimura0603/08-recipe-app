import { Codegen, KyselyAuth } from "@auth/kysely-adapter";
import { ConnectionString } from "connection-string";
import { MysqlDialect } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { createPool } from "mysql2";
import { fetch } from "undici";

import { DB } from "@/types/db";

export const dialect = (() => {
  if (process.env.KYSELEY_DB_DIALECT === "mysql") {
    const { hosts, user, password, path } = new ConnectionString(process.env.DATABASE_URL);

    return new MysqlDialect({
      pool: createPool({
        host: hosts && hosts[0].name,
        user,
        password,
        database: path && path[0],
      }),
    });
  }

  return new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    fetch,
  });
})();

export const db = new KyselyAuth<DB, Codegen>({ dialect });
