import { DateTime, Duration } from "luxon";

export function parseDbTimeStampTZ(datetime?: string): DateTime | undefined {
  if (!datetime) {
    return undefined;
  }
  
  try {
    return DateTime.fromISO(datetime);
  } catch(error) {
    return undefined;
  }
}

export function parseDbMilliseconds(ms?: string): Duration | undefined {
  if (!ms) {
    return undefined;
  }

  try {
    return Duration.fromMillis(+ms);
  } catch(error) {
    return undefined;
  }
}
