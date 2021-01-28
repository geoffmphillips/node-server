"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbProvider = exports.dbProviderCtor = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const settings_1 = require("./settings");
function dbProviderCtor(settings, test = false) {
    let db;
    async function dbProvider(callback) {
        if (!db) {
            const { databaseUrl, databaseUrlTest } = await settings();
            const pgPromiseOptions = {};
            db = pg_promise_1.default(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
        }
        return db.tx(async (db) => {
            return callback(db);
        });
    }
    return dbProvider;
}
exports.dbProviderCtor = dbProviderCtor;
exports.dbProvider = dbProviderCtor(settings_1.getSettings);
//# sourceMappingURL=db_provider.js.map