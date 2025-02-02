import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_AkdGvXj47WgT@ep-billowing-glitter-a8fheei7-pooler.eastus2.azure.neon.tech/mock-interviewer?sslmode=require'
  }
});