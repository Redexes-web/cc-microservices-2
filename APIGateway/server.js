const express = require('express');
const app = express();
const proxy = require("express-http-proxy")

app.use("/api/auth", proxy("http://authentication-service:8081"));
app.use("/api/product", proxy("http://products-service:8082"));

app.listen(3000, () => {
  console.log('listening on port 3000');
});