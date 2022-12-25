import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export const write = (data) => {
  fs.readFile("app.log", function (err, prev) {
    console.log({ err });
    fs.writeFileSync("app.log", prev + " \n\n" + data);
  });
};
