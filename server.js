
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const testUsername = "stu123";
const testPassword = "123";

let loginRecords = [];

app.get("/", (req, res) => {
  res.send("SocialConnect Backend is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/demo-login", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  if (!username || !password) {
    return res.status(400).json({
      message: "Enter the demo username and password."
    });
  }

  const success =
    username === testUsername &&
    password === testPassword;

  loginRecords.push({
    username,
    result: success ? "Success" : "Failed",
    time: new Date().toISOString()
  });

  res.status(success ? 200 : 401).json({
    success,
    message: success ? "Demo login successful!" : "Login failed."
  });
});

app.get("/demo-logins", (req, res) => {
  res.json(loginRecords);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SocialConnect server running on port ${PORT}`);
});
