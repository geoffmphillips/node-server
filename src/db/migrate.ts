import fs from "fs";
import path from "path";

import { resolvedNull } from '../utils/resolved_null';
import { dbType } from "./db";

export async function migrateDb(db: dbType): Promise<null> {
  const migrationsDirectory: string = "/migrations/";
  const migrations: string[] = fs.readdirSync(path.join(__dirname + migrationsDirectory));

  if (migrations.length === 0) {
    return;
  }

  const notApplied: { id: string }[] = await db.any(`
    SELECT x.id FROM unnest(ARRAY[$(migrations)]) x(id) 
    LEFT JOIN meta.migrations m
    ON x.id = m.id
    WHERE m.id IS NULL;`, 
    { migrations },
  );

  notApplied.forEach(async ({ id }): Promise<null> => {
    const migrationSql: string = fs.readFileSync(path.join(__dirname, migrationsDirectory, id), "utf-8");

    try {
      await db.none(migrationSql);
      await db.none('INSERT INTO meta.migrations (id) VALUES ($(id))', { id });
      console.log(`Applied migration ${id}`);
      return resolvedNull;
    } catch (error) {
      console.log(`${id} not applied do to error:`, error);
    }
  });

  if (process.env.DRY_RUN !== undefined) {
    throw new Error("Rollback");
  }

  return resolvedNull;
}
