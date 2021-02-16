"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const migrate_1 = require("./migrate");
(async function () {
    return await migrate_1.migrateDb(db_1.db);
});
//# sourceMappingURL=migrate_latest.js.map