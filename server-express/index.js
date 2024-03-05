require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  try {
    const r = await axios.post(
      "https://chatengine.io/projects/751585ac-b002-489b-9832-40e11b4ad911#users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  try {
    const r = await axios.get(
      "https://chatengine.io/projects/751585ac-b002-489b-9832-40e11b4ad911#users/",
      {
        headers: {
          "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
          "User-Name": username,
          "User-Secret": secret,
        },
      }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);
