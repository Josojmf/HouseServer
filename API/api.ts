import express from "express";
import { getFile,postFile } from "./resolvers";
const {exec} = require("child_process");

const run = async () => {
    const app = express();
 
    app.use((req, res, next) => {
      next();
    });
    exec('cd Files && python -m SimpleHTTPServer 8000')
    //exec('python -m "http.server')
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get("/getFile", getFile);
    app.post("/postFile",postFile)

    await app.listen(4000);
    console.log(`Server running on port ${4000}`);
  };
  
  try {
    run();
  } catch (e) {
    console.error(e);
  }