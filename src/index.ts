import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import { AppDataSource } from "../ormconfig";
import * as dotenv from "dotenv";
import Initializer from "./initialize";

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();
    Initializer.initialize();
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch((error) => console.log(error));
