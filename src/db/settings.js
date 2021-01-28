"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = void 0;
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
};
let _settings;
async function getSettings() {
    if (!_settings) {
        _settings = {};
        const missingFromEnv = [];
        Object.keys(requiredFromEnv).forEach((k) => {
            let envName = requiredFromEnv[k];
            const v = process.env[envName];
            if (v === undefined) {
                missingFromEnv.push(envName);
            }
            console.log(`${k}=${v} [${envName}]`);
            _settings[k] = v;
        });
        Object.keys(optionalFromEnv).forEach((k) => {
            let envName = optionalFromEnv[k];
            const v = process.env[envName];
            console.log(`${k}=${v} [${envName}]`);
            _settings[k] = v;
        });
        if (missingFromEnv.length) {
            throw new Error(`Setting(s) missing in ENV: ${missingFromEnv.join(", ")}`);
        }
    }
    return _settings;
}
exports.getSettings = getSettings;
//# sourceMappingURL=settings.js.map