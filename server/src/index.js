const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// get currency names
app.get("/getAllCurrencies", async (req, res) => {
  const namesURL =
    "https://openexchangerates.org/api/currencies.json?app_id=73d69638dfca4d6d972cbf094bba8d2c";
  try {
    const namesResponse = await axios.get(namesURL);
    const namesData = namesResponse.data;
    return res.json(namesData);
  } catch (err) {
    console.error(err);
  }
});

//get the target amount
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  const ratesURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=73d69638dfca4d6d972cbf094bba8d2c`;
  try {
    const ratesResponse = await axios.get(ratesURL);
    const ratesData = ratesResponse.data.rates;
    const sourceRate = ratesData[sourceCurrency];
    const targetRate = ratesData[targetCurrency];
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount);
  } catch (error) {
    console.error(error);
  }
});

//listen to a port
app.listen(5000, () => {
  console.log("Server Started");
});
