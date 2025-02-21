import "ts-node/register";
import { ExpoConfig } from "expo/config";
import dotenv from "dotenv";

dotenv.config();

const config: ExpoConfig = {
  name: process.env.APP_NAME || "my-app",
  slug: process.env.APP_SLUG || "my-app",
};

export default config;