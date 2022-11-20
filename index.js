const axios = require("axios");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

var whitelistOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelistOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.post("/event", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.API_URL_BASE_URL}/event`,
      data: req.body,
    });

    res.send(response.data).status(response.status);
  } catch (e) {
    res.status(500);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT: ", process.env.PORT);
});
