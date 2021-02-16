"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
if (!process.env.DB_URL) {
    const pathname = path_1.default.join(__dirname, '../../.env');
    dotenv_1.default.config({
        path: pathname,
    });
}
const requiredFromEnv = {
    databaseUrl: "DB_URL",
    databaseUrlTest: "TEST_DB_URL",
    googleAuthId: "GOOGLE_AUTH_CLIENT_ID",
    googleAuthSecret: "GOOGLE_AUTH_CLIENT_SECRET",
    projectUrl: "PROJECT_URL",
    sessionSecret: "SESSION_SECRET",
};
const optionalFromEnv = {
    slackHook: "SLACK_HOOK",
    sessionCookieMaxAge: "SESSION_MAX_AGE",
    sessionCookieName: "SESSION_NAME",
};
let _settings;
function getSettings() {
    if (!_settings) {
        _settings = {};
        const missingFromEnv = [];
        Object.entries(requiredFromEnv).forEach(([key, envKey]) => {
            const envValue = process.env[envKey];
            if (!envValue) {
                missingFromEnv.push(envKey);
            }
            _settings[key] = envValue;
        });
        Object.entries(optionalFromEnv).forEach(([key, envKey]) => {
            _settings[key] = process.env[envKey];
        });
        if (missingFromEnv.length) {
            throw new Error(`Setting(s) missing in ENV: ${missingFromEnv.join(", ")}`);
        }
    }
    return _settings;
}
exports.getSettings = getSettings;
//# sourceMappingURL=settings.js.map