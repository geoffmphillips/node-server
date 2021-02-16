"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProviderConstructor = exports.dbProvider = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const settings_1 = require("../config/settings");
function dbProviderConstructor(settings, test = false) {
    let db;
    return async function dbProvider(callback) {
        if (!db) {
            const { databaseUrl, databaseUrlTest } = await settings();
            const pgPromiseOptions = {};
            db = pg_promise_1.default(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
        }
        return db.tx((db) => {
            return callback(db);
        });
    };
}
exports.dbProviderConstructor = dbProviderConstructor;
const dbProvider = dbProviderConstructor(settings_1.getSettings);
exports.dbProvider = dbProvider;
//# sourceMappingURL=db.js.map