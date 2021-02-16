"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const migrate_1 = require("./migrate");
const resolved_null_1 = require("../utils/resolved_null");
async function setupDb(db) {
    if (process?.env?.ENV !== 'production') {
        const seedSql = fs_1.default.readFileSync(path_1.default.join(__dirname, '/seed.sql'), "utf-8");
        if (!seedSql) {
            return;
        }
        await db.none(seedSql);
    }
    if (process?.env?.DRY_RUN !== undefined) {
        throw new Error("Rollback");
    }
    return resolved_null_1.resolvedNull;
}
(async function () {
    await setupDb(db_1.db);
    return await migrate_1.migrateDb(db_1.db);
})();
//# sourceMappingURL=setup.js.map