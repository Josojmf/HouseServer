import { Request, Response } from "express";
import { Db } from "mongodb";
import { v4 as uuid } from "uuid";
import axios from "axios";
import fs from "fs";
import bcrypt from "bcrypt"
export const status = async (req: Request, res: Response) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (res.statusCode === 200) res.status(200).send(`${day}-${month}-${year}`);
  else res.status(res.statusCode).send(res.statusCode.toString());
};

export const signin = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { name, password } = req.query as {
    name: string;
    password: string;
  }
  console.log(name,password)
  if (!name || !password) {
    return res.status(500).send(`No username or password `);
  }
  let user = await axios.get(`http://192.168.1.120:8000/${name}.json`).catch(err => err)
  if (user.data) {
    return res.status(409).send("Username already in use")
  } else {
    let hasshed_passw = await bcrypt.hash(password, 10);
    const userUP = { username: `${name}`, password: `${hasshed_passw}` };
    const format = JSON.stringify(userUP)
    fs.writeFileSync(`./../Server/Files/${name}.json`, format)
    return res.status(200).send("Signed in")
  }
}
export const login = async (req: Request, res: Response) => {

  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { name, password } = req.query as {
    name: string;
    password: string;
  }

  if (!name || !password) {
    return res.status(500).send("No username or password");
  }
  let user = await axios.get(`http://192.168.1.120:8000/${name}.json`).catch(err => err)
  const validPass = await bcrypt.compare(password,user.data.password);
  if (user.data && validPass) {
    if (user.data.token != null) {
      res.status(500).send(`Already logged in, your token is ${user.data.token}`)
    } else {
      const token = uuid();
      const userUP = { username: `${name}`, password: `${user.data.password}`, token: `${token}` };
      const format = JSON.stringify(userUP)
      fs.writeFileSync(`./../Server/Files/${name}.json`, format)
      return res.status(200).send(`${token}`);
    }
  } else {
    return res.status(401).send("Incorrect username or password");
  }
}

export const logout = async (req: Request, res: Response) => {
  if (!req.query.token) {
    return res.status(500).send("No token provided");
  }
  const token = req.query.token
  let loop = (file:string) => {
    const openFile= JSON.parse(fs.readFileSync(file,'utf8'))
    if(token==openFile.token){
      const userUP = { username: `${openFile.username}`, password: `${openFile.password}` };
      const format = JSON.stringify(userUP)
      fs.writeFileSync(`./../Server/Files/${openFile.username}.json`, format)
    return res.status(200).send(`Logged out ${openFile.username}`);
    }
  }
  (await fs.promises.readdir("../Server/Files")).map(f=>(loop(("./../Server/Files/"+f))))
}

