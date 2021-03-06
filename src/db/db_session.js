"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSession = exports.dbSessionConstructor = void 0;
const uuid_1 = require("uuid");
const resolved_null_1 = require("../utils/resolved_null");
const db_1 = require("./db");
function dbSessionConstructor(db) {
    return {
        async create() {
            const uuid = uuid_1.v4();
            const session = await db.one(`
        INSERT INTO sessions (id) VALUES ($(uuid))
        RETURNING encode(id, 'hex') AS id;`, { uuid });
            if (!session?.id) {
                throw Error('Could not create a new session.');
            }
            return { id: session.id };
        },
        async verify(sessionId) {
            const session = await db.oneOrNone(`
          SELECT s.user_id, u.roles
          FROM sessions s
          LEFT JOIN users u ON s.user_id = u.id
          WHERE s.id=decode($(sessionId), 'hex')
          AND s.expire_at > now()`, { sessionId });
            return session ? { id: sessionId, userId: session.user_id, roles: session?.roles } : resolved_null_1.resolvedNull;
        },
        async update(session, expiryInterval) {
            await db.result(`
        UPDATE sessions 
        SET 
          expire_at = now() + '$(expiryInterval) millisecond'::INTERVAL, 
          user_id=$(userId) 
        WHERE session_id=decode($(sessionId),'hex');`, {
                sessionId: session.id,
                userId: session.userId,
                expiryInterval,
            });
            return resolved_null_1.resolvedNull;
        },
        async expire() {
            await db.result("DELETE FROM sessions WHERE expires_at < now();");
            return resolved_null_1.resolvedNull;
        },
        async delete(sessionId) {
            await db.result("DELETE FROM ssessions WHERE session_id=decode($(sessionId),'hex';", { sessionId });
            return resolved_null_1.resolvedNull;
        },
    };
}
exports.dbSessionConstructor = dbSessionConstructor;
exports.dbSession = dbSessionConstructor(db_1.db);
//# sourceMappingURL=db_session.js.map