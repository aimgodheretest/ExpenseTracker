require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const connectDB = require("./utils/db");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const premiumRouter = require("./routes/premiumRouter");
const passwordRouter = require("./routes/password");
const reportRouter = require("./routes/reportRouter");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const port = 3000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  },
);

app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signupRouter);
app.use(loginRouter);
app.use(dashboardRouter);
app.use("/expense", expenseRouter);
app.use(purchaseRouter);
app.use("/premium", premiumRouter);
app.use("/password", passwordRouter);
app.use(reportRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is Running on port:http://localhost:${port}`);
  });
});
