import pgPromise from 'pg-promise';
import { getSettings, settingsType } from '../config/settings';

type dbType = pgPromise.IDatabase<any>;

function dbProviderConstructor(settings: () => Promise<settingsType>, test: boolean = false) {
  let db: any;

  return async function dbProvider<T>(callback: (db: dbType) => Promise<T>): Promise<T> {
    if (!db) {
      const { databaseUrl, databaseUrlTest } = await settings();
      const pgPromiseOptions = {};

      db = pgPromise(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
    }

    return db.tx((db: dbType) => {
      return callback(db);
    });
  }
}

const dbProvider = dbProviderConstructor(getSettings);

export { dbType, dbProvider, dbProviderConstructor };