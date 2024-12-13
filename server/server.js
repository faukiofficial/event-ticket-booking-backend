const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const databaseConnect = require("./config/database.js");
databaseConnect();

const errorHandler = require("./middlewares/error-handler.js");
const notFoundMiddleware = require("./middlewares/not-found.js");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello World from Server",
  });
});

app.use("/api/categories", require("./api/categories/router.js"));
app.use("/api/images", require("./api/images/router.js"));
app.use("/api/talents", require("./api/talents/router.js"));
app.use("/api/events", require("./api/events/router.js"));
app.use("/api/users", require("./api/organizers/router.js"));
app.use("/api/auth", require("./api/auth/router.js"));
app.use("/api/orders", require("./api/orders/router.js"));
app.use("/api/participants", require("./api/participants/router.js"));
app.use("/api/payments", require("./api/payments/router.js"));

app.use(errorHandler);
app.use(notFoundMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
