import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  // states for the 4 fields
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState(null);
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);

  // to store the calculated value
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);

  const [currencyNames, setCurrencyNames] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });
      //TODO: set the rest...
      setAmountInTargetCurrency(response.data);
      // const result = document.createElement(response);
      // document.getElementById("myDiv").appendChild(result);
    } catch (err) {
      console.error(err);
    }
  };

  // get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Currency Exchange Calculator
      </h1>
      <p className="lg:mx-32 py-6 opacity-40">
        Welcome to the future of seamless currency exchange – Whether you're a
        savvy traveler, a global business professional, or simply someone
        managing international transactions, our app is designed to simplify and
        optimize your currency exchange experience like never before.
      </p>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="date"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-green-500 dark:focus:border-green-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
              >
                <option value="">Select source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-green-500 dark:focus:border-green-500"
                name={targetCurrency}
                id={targetCurrency}
              >
                <option value="">Select target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in source currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Amount in source currency"
                required
              />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
              Get the target currency
            </button>
          </form>
        </section>
      </div>
      {amountInTargetCurrency}
    </div>
  );
}
