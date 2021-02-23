"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyOf = exports.allOf = exports.admin = exports.staff = exports.user = exports.anon = void 0;
const constants_1 = require("./constants");
const anon = () => true;
exports.anon = anon;
const user = (session) => !!(session?.userId);
exports.user = user;
const staff = (session) => session?.roles.includes(constants_1.USER);
exports.staff = staff;
const admin = (session) => session?.roles.includes(constants_1.ADMIN);
exports.admin = admin;
const allOf = (requiredRoles) => {
    return (session) => {
        if (!session?.roles) {
            return false;
        }
        return requiredRoles.every(role => session.roles.includes(role));
    };
};
exports.allOf = allOf;
const anyOf = (permittedRoles) => {
    return (session) => {
        if (!session?.roles) {
            return false;
        }
        return permittedRoles.some(role => session.roles.includes(role));
    };
};
exports.anyOf = anyOf;
//# sourceMappingURL=index.js.map