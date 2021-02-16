import { db } from './db';
import { migrateDb } from './migrate';

(async function() {
  return await migrateDb(db);
});
