const express = require("express");
const pool = require("./db");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors({}));
app.use(bodyParser.json());
app.use(router);
app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
