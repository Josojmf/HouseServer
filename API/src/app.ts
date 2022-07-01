import { Db } from "mongodb";
import express from "express";
import { signin, status, login,logout,findUser,getProductos,deleteProducto,addProducto} from "./resolvers";
import dotenv from "dotenv";

const run = async () => {
  dotenv.config()
  const app = express();
  var cors = require('cors');
  app.use(cors());
  const {exec} = require("child_process");
  exec('cd ./../Server && python server.py')

  app.use((req, res, next) => {
    next();
  });
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.get("/status", status);
  app.get("/findUser",findUser);
  app.get("/getProductos",getProductos)
  app.post("/signin", signin);
  app.post("/deleteProducto", deleteProducto)
  app.post("/addProducto",addProducto)
  app.post("/login", login);
  app.post("/logout", logout);
  await app.listen(process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
};

try {
  run();
} catch (e) {
  console.error(e);
}
