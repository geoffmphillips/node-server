import pgPromise from 'pg-promise';
import { getSettings, settingsType } from './settings';

type Ext = {};
export type dbType = pgPromise.IDatabase<Ext>;

export function dbProviderCtor(settings: () => Promise<settingsType>, test: boolean = false) {
  let db: any;

  async function dbProvider<T>(callback: (db: dbType) => Promise<T>): Promise<T> {
    if (!db) {
      const { databaseUrl, databaseUrlTest } = await settings();
      const pgPromiseOptions = {};

      db = pgPromise<Ext>(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
    }

    return db.tx(async (db) => {
      return callback(db);
    });
  }

  return dbProvider;
}

export const dbProvider = dbProviderCtor(getSettings);
export type dbProviderType = typeof dbProvider;
