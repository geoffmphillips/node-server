import { v4 } from 'uuid';

import { resolvedNull } from '../utils/resolved_null';
import { db, dbType } from './db';

export type sessionInfoType = {
  id: string,
  userId?: string,
  displayName?: string,
  email?: string,
  permission?: { [name: string]: boolean }
};

export function dbSessionConstructor(db: dbType) {
  return {
    async create(): Promise<{ id: string }> {
      const uuid = v4();
      const session = await db.one(`
        INSERT INTO sessions (id) VALUES ($(uuid))
        RETURNING encode(id, 'hex') AS id;`,
        { uuid }
      );

      if (!session || !session.id) {
        throw Error('could not create a new session.');
      }

      return { id: session.id };
    },

    async verify(sessionId: string): Promise<sessionInfoType | null> {
      const session = await db.oneOrNone(`
          SELECT user_id
          FROM sessions
          WHERE id=decode($(sessionId), 'hex')
          AND expire_at > now()`,
          { sessionId },
      );

      return session ? { id: sessionId, userId: session.user_id } : resolvedNull;
    },

    async update(session: sessionInfoType, expiryInterval: number): Promise<null> {
      await db.result(`
        UPDATE sessions 
        SET 
          expire_at = now() + '$(expiryInterval) millisecond'::INTERVAL, 
          user_id=$(userId) 
        WHERE session_id=decode($(sessionId),'hex');`,
        {
          sessionId: session.id,
          userId: session.userId,
          expiryInterval,
        },
      );

      return resolvedNull;
    },

    async expire(): Promise<null> {
      await db.result("DELETE FROM sessions WHERE expires_at < now();");
      return resolvedNull;
    },

    async delete(sessionId: string): Promise<null> {
      await db.result("DELETE FROM ssessions WHERE session_id=decode($(sessionId),'hex';", 
        {sessionId}
      );
      return resolvedNull;
    },
  };
}

export const dbSession = dbSessionConstructor(db);
