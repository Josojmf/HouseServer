import { Request, Response } from "express";
import { Db } from "mongodb";
import { v4 as uuid } from "uuid";
import axios from "axios";
import fs from "fs";
import bcrypt from "bcrypt";
export const status = async (req: Request, res: Response) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (res.statusCode === 200) res.status(200).send(`${day}-${month}-${year}`);
  else res.status(res.statusCode).send(res.statusCode.toString());
};

export const checkLogin = async (token: string, db: Db) => {
  const user = await db.collection("Users").findOne({ token });
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const signin = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("Users");
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { username, password } = req.query as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    console.log(req.body);
    return res.status(500).send(`No username or password `);
  }
  const user = await collection.findOne({ username });
  if (user) {
    return res.status(409).send("Username already in use");
  } else {
    let hasshed_passw = await bcrypt.hash(password, 10);
    await collection.insertOne({
      username,
      password: hasshed_passw,
      token: null,
    });
    return res.status(200).send("Signed in");
  }
};
export const login = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("Users");
  const { username, password } = req.query as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    console.log(req.body);
    return res.status(500).send(`No username or password `);
  }

  if (!username || !password) {
    return res.status(500).send("No username or password");
  }
  const user = await collection.findOne({ username });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      if (user.token != null) {
        res.status(500).send(`Already logged in, your token is ${user.token}`);
      } else {
        const token = uuid();
        await collection.updateOne({ username }, { $set: { token: token } });

        return res.status(200).send(token);
      }
    } else {
      res.status(401).send("Incorrect username or password");
    }
  } else {
    return res.status(401).send("Incorrect username or password");
  }
};

export const logout = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("Users");
  if (!req.query.token) {
    return res.status(500).send("No token provided");
  }
  const token = req.query.token;
  const active = await collection.findOne({ token: token });
  if (active) {
    await collection.updateOne({ token: token }, { $set: { token: null } });
    return res.status(200).send(`Logged out ${active.username}`);
  } else {
    return res.status(401).send(`This user is not active or not found`);
  }
};
export const findUser = async (req: Request, res: Response) => {
  if (!req.query.token) {
    return res.status(500).send("No token provided");
  }
  const token = req.query.token;
  const db: Db = req.app.get("db");
  const collection = db.collection("Users");
  const active = await collection.findOne({ token: token });
  if (active) {
    return res.status(200).send(active.username);
  } else {
    return res.status(500).send("No token provided");
  }
};
export const getProductos = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const db: Db = req.app.get("db");
  const collection = db.collection("Productos");

  const { token } = req.query as {
    token: string;
  };

  if (!token) {
    return res.status(500).send("No params");
  }
  const userCheck = await checkLogin(token, db);
  if (userCheck == null) {
    return res.status(401).send("Not logged in");
  } else {
    const productos = await collection.find({}).toArray();
    const format = productos.map((producto) => {
      return producto.producto + " " + producto.cantidad;
    });
    return res.status(200).send(format);
  }
};
export const deleteProducto = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.status(500).send("No params");
  }
  let { producto, token } = req.query as {
    token: string;
    producto: string;
  };
  const db: Db = req.app.get("db");
  const collection = db.collection("Productos");
  const userCheck = await checkLogin(token, db);
  if (userCheck == null) {
    return res.status(401).send("Not logged in");
  } else {
    producto=(producto.slice(0, producto.length - 2));
    const productoCheck = await collection.findOne({ producto: producto });
    if (productoCheck) {
      await collection.deleteOne({ producto: producto });
      return res.status(200).send(`Deleted ${producto}`);
    } else {
      return res.status(500).send(`No existe el producto ${producto}`);
    }
  }
};

export const addProducto = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const db: Db = req.app.get("db");
  const collection = db.collection("Productos");

  const { producto, token, cantidad } = req.query as {
    token: string;
    producto: string;
    cantidad: string;
  };

  if (!producto || !token) {
    return res.status(500).send("No params");
  }
  const userCheck = await checkLogin(token, db);
  if (userCheck == null) {
    return res.status(401).send("Not logged in");
  } else {
    const repeated = await collection.findOne({ producto: producto });
    if (repeated) {
      return res.status(409).send("Producto ya guardado");
    } else {
      await collection.insertOne({
        uploadedBy: userCheck.username,
        producto: producto,
        cantidad: cantidad,
      });
      return res.status(200).send("Producto guardado");
    }
  }
};
