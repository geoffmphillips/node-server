import { ADMIN, USER } from './constants';
import { sessionType } from '../../db/db_session';

type authType = (session?: sessionType) => boolean;

const anon: authType = () => true;
const user: authType = (session) => !!(session?.userId);
const staff: authType = (session) => session?.roles.includes(USER);
const admin: authType = (session) => session?.roles.includes(ADMIN);

const allOf = (requiredRoles: string[]): authType => {
  return (session: sessionType) => {
    if (!session?.roles) {
      return false;
    }

    return requiredRoles.every(role => session.roles.includes(role));
  }
}

const anyOf = (permittedRoles: string[]): authType => {
  return (session: sessionType) => {
    if (!session?.roles) {
      return false;
    }
    
    return permittedRoles.some(role => session.roles.includes(role));
  }
}

export {
  anon,
  user,
  staff,
  admin,
  allOf,
  anyOf,
  authType,
}