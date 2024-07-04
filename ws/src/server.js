import express from "express";
import cors from "cors";

import { config } from "dotenv";
import { createDbConnection } from "./config/db.config";
import authRouter from "./auth/auth.route";
config();

const app = express();
const PORT = process.env.PORT;
const mainPrefix = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(mainPrefix, authRouter);

(async () => {
  await createDbConnection();
  app.listen(PORT, async () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
})();
