import fs from "fs";
import path from "path";

import { db, dbType } from './db';
import { migrateDb } from './migrate';
import { resolvedNull } from '../utils/resolved_null'

async function setupDb(db: dbType): Promise<null> {
  if (process?.env?.ENV !== 'production') {
    const seedSql: string = fs.readFileSync(path.join(__dirname, '/seed.sql'), "utf-8");

    if (!seedSql) {
      return;
    }

    await db.none(seedSql);
  }

  if (process?.env?.DRY_RUN !== undefined) {
    throw new Error("Rollback");
  }

  return resolvedNull;
}

(async function() {
  await setupDb(db);
  return await migrateDb(db);
})();
