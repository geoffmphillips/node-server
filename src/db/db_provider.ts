import pgPromise from 'pg-promise';
import { getSettings, settingsType } from '../config/settings';
import { dbType } from './db';

function dbProviderConstructor(settings: () => settingsType, test: boolean = false) {
  let db: dbType;

  return async function dbProvider<T>(callback: (db: dbType) => Promise<T>): Promise<T> {
    if (!db) {
      const { databaseUrl, databaseUrlTest } = settings();
      const pgPromiseOptions = {};

      db = pgPromise(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
    }

    return db.tx((db: dbType) => {
      return callback(db);
    });
  }
}

const dbProvider = dbProviderConstructor(getSettings);

export { dbProvider, dbProviderConstructor };