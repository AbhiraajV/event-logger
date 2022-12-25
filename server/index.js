import express from "express";
import * as dotenv from "dotenv";
import { DbConnect } from "./util/DbConnection.js";
import eventApis from "./apis/event.apis.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = 8080;

await DbConnect();
// app.use(express.bodyParser());
app.use(express.json());
app.use(cors());
app.get("/healthcheck", (req, res) => {
  res.send("api is up!");
});

eventApis(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 9VRol3ujy7PqZ011
