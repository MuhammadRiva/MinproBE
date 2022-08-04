require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const RouterProduct = require("./routes/product");
const RouterMerchant = require("./routes/merchant");

app.use(bodyParser.json());
app.use("/product", RouterProduct);
app.use("/merchant", RouterMerchant);

app.listen(process.env.port, () => {
  console.log(`Listening to port ${process.env.port}`);
});
