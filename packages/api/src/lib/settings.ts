import dotenv from "dotenv";

dotenv.config();

class Settings {
  private static instance: Settings | null = null;

  db_connection_string: string;
  jwt_secret: string;

  private constructor() {
    this.db_connection_string = process.env.DATABASE_URL || "";
    this.jwt_secret = process.env.JWT_SECRET || "";
  }

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }
}

export const settings = Settings.getInstance();
