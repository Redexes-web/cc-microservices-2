const express = require('express');
const app = express();
const proxy = require("express-http-proxy")

app.use("/api/auth", proxy("http://2-authentication-service-1:8081"));

app.listen(3000, () => {
  console.log('listening on port 3000');
});