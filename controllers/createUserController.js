const pool = require("../db");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.createUserController = async (req, res) => {
  const getAllusers = await pool.query("SELECT * FROM allcontacts");
  const { username, password } = req.body;
  const userExist = (getAllusers.rows ?? []).filter(
    (data) => data.username === username
  );
  if (userExist.length > 0) {
    res.send("user already exist");
    return;
  } else {
    const newhashedpass = await bcrypt
      .hash(password, 10)
      .then((hash) => {
        return hash;
      })
      .catch((err) => console.error(err.message));
    const insertUser = await pool.query(
      `INSERT INTO allcontacts (username,passhash,userid) values($1,$2,$3) RETURNING username;`,
      [username, newhashedpass, uuid()]
    );
    if (insertUser.rows[0].username) {
      res.json({ message: "User created successfully" });
      return;
    } else {
      res.json({ message: "user creation failed" });
    }
  }
};
module.exports.loginUserController = async (req, res) => {
  const { username, password } = await req.body;
  const existingUser = await pool.query(
    "SELECT username , passhash from allcontacts where username=$1",
    [username]
  );
  if (!existingUser.rows[0] || !existingUser.rows[0].username) {
    res.send("User dosent exist");
  } else {
    const isValidPassword = await bcrypt
      .compare(password, existingUser.rows[0].passhash)
      .then((res) => {
        return res; // return true
      })
      .catch((err) => console.error(err.message));
    if (!isValidPassword) {
      res.json({ message: "wrong username or password" });
    } else {
      const token = jwt.sign({ username: username }, process.env.SECRET_KEY, {
        expiresIn: 60,
      });
      res.json({ message: "logged in successfully", token });
    }
  }
};
