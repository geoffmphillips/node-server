import path from 'path';
import dotenv from 'dotenv';

if (!process.env.DB_URL) {
  const pathname: string = path.join(__dirname, '../../.env');
  dotenv.config({
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
};

export type settingsType = {
    databaseUrl?: string | undefined,
    databaseUrlTest?: string | undefined,
    googleAuthId?: string | undefined,
    googleAuthSecret?: string | undefined,
    projectUrl?: string | undefined,
    sessionSecret?: string | undefined,
    slackHook?: string | undefined,
}

let _settings: settingsType;

export function getSettings(): settingsType {
  if (!_settings) {
    _settings = {};
    const missingFromEnv: string[] = [];

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

