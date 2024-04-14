const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.getUserData = async (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Remove Bearer from string
  token = token.replace(/^Bearer\s+/, "");
  if (token) {
    await jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        res.send("Not Authorised");
        return;
      } else {
        if (data) {
          res.json({ data, details: "hari" });
        }
      }
    });
  } else {
    res.json({ valid: false, message: "token not provided" });
  }
};
