"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConstructor = exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const settings_1 = require("../config/settings");
let db;
exports.db = db;
function dbConstructor(settings, test = false) {
    if (!db) {
        const { databaseUrl, databaseUrlTest } = settings();
        const pgPromiseOptions = {};
        return pg_promise_1.default(pgPromiseOptions)(test ? databaseUrlTest : databaseUrl);
    }
}
exports.dbConstructor = dbConstructor;
exports.db = db = dbConstructor(settings_1.getSettings);
//# sourceMappingURL=db.js.map