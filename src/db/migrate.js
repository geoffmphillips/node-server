"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDb = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resolved_null_1 = require("../utils/resolved_null");
async function migrateDb(db) {
    const migrationsDirectory = "/migrations/";
    const migrations = fs_1.default.readdirSync(path_1.default.join(__dirname + migrationsDirectory));
    if (migrations.length === 0) {
        return;
    }
    const notApplied = await db.any(`
    SELECT x.id FROM unnest(ARRAY[$(migrations)]) x(id) 
    LEFT JOIN meta.migrations m
    ON x.id = m.id
    WHERE m.id IS NULL;`, { migrations });
    notApplied.forEach(async ({ id }) => {
        const migrationSql = fs_1.default.readFileSync(path_1.default.join(__dirname, migrationsDirectory, id), "utf-8");
        try {
            await db.none(migrationSql);
            await db.none('INSERT INTO meta.migrations (id) VALUES ($(id))', { id });
            console.log(`Applied migration ${id}`);
        }
        catch (error) {
            console.log(`${id} not applied do to error:`, error);
        }
    });
    if (process.env.DRY_RUN !== undefined) {
        throw new Error("Rollback");
    }
    return resolved_null_1.resolvedNull;
}
exports.migrateDb = migrateDb;
//# sourceMappingURL=migrate.js.map