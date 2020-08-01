require("dotenv/config");

/* Library initialization */
const express = require("express");
const helmet = require("helmet");

const { sequelize } = require("./helpers/conection");
const response = require("./helpers/response");

const routes = require("./routes");

/* Initial express into app */
const app = new express();

/* Use body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Use helmet */
app.use(helmet()); // Default setting -> DNS prefetching, clickjacking, hide Power By, HSTS, X-Download-Options IE8+, sniffing MIME Type, XSS Protection

/* Route initialization */
app.use("/", routes);
app.use("*", (req, res) => {
  response.notfound(res, "Endpoint Not Found");
});

/* Server initialization */
const host = process.env.HOST || "localhost"; // hostname
const port = process.env.PORT || 4000; // used port

sequelize.sync({
  force: false,
});

app.listen(port, host, () => {
  console.log(`Service start on host : ${host} and port : ${port}`);
});

app.listen(port);
