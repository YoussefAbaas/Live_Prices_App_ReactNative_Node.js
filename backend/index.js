require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

const socketHandler = socketIo(server);

socketHandler.on("connection", (socket) => {
  socket.on("connect_error", () => {
    console.log("connection error");
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
  console.log("client connected");
  //socket.emit("crypto", "hello cryptos client");
});

const fetchPrices = () => {
  axios
    .get(process.env.LIST_URL, {
      headers: {
        " x-messari-api-key": process.env.API_KEY,
      },
    })
    .then((response) => {
      const priceList = response.data.data.map((item) => {
        return {
          id: item.id,
          name: item.symbol,
          price: item.metrics.market_data.price_usd,
        };
      });
      socketHandler.emit("crypto", priceList);
    })
    .catch((err) => {
      console.log(err);
      socketHandler.emit("crypto", {
        error: true,
        message: "Error fetching prices data from api",
      });
    });
};

setInterval(() => {
  fetchPrices();
}, 30000);

app.get("/cryptos/profile", (req, res) => {
  res.json({ error: true, message: "MISSING CRYPTO ID IN THE API URL" });
});

app.get("/cryptos/profile/:id", (req, res) => {
  const cryptoId = req.params.id;
  axios
    .get(`${process.env.BASE_URL_V2}/${cryptoId}/profile`, {
      headers: {
        " x-messari-api-key": process.env.API_KEY,
      },
    })
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Error fetching prices data from api",
        errorDetails: err,
      });
    });
});

app.get("/cryptos/market-data", (req, res) => {
  res.json({ error: true, message: "MISSING CRYPTO ID IN THE API URL" });
});

app.get("/cryptos/market-data/:id", (req, res) => {
  const cryptoId = req.params.id;
  axios
    .get(`${process.env.BASE_URL_V1}/${cryptoId}/metrics/market-data`, {
      headers: {
        " x-messari-api-key": process.env.API_KEY,
      },
    })
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "Error fetching prices data from api",
        errorDetails: err,
      });
    });
});
