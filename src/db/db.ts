import pgPromise from 'pg-promise';
import { getSettings, settingsType } from '../config/settings';

type dbType = undefined | pgPromise.IDatabase<any>;
let db: dbType;

function dbConstructor(settings: () => settingsType, test: boolean = false): dbType {
  if (!db) {
    const { databaseUrl, databaseUrlTest } = settings();
    const pgPromiseOptions = {};

    return pgPromise(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
  }
}

db = dbConstructor(getSettings)

export { db, dbType, dbConstructor };