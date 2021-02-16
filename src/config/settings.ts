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
    databaseUrl?: string,
    databaseUrlTest?: string,
    googleAuthId?: string,
    googleAuthSecret?: string,
    projectUrl?: string,
    sessionSecret?: string,
    slackHook?: string,
}

let _settings: settingsType;

export async function getSettings(): Promise<settingsType> {
  if (!_settings) {
    _settings = {};
    const missingFromEnv: string[] = [];

    Object.keys(requiredFromEnv).forEach((k) => {
      let envName = requiredFromEnv[k];
      const v = process.env[envName];
      if (v === undefined) {
        missingFromEnv.push(envName);
      }
      _settings[k] = v;
    });

    Object.keys(optionalFromEnv).forEach((k) => {
      let envName = optionalFromEnv[k];
      const v = process.env[envName];
      _settings[k] = v;
    });

    if (missingFromEnv.length) {
      throw new Error(`Setting(s) missing in ENV: ${missingFromEnv.join(", ")}`);
    }
  }
  
  return _settings;
}

