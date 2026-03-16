require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/dbConnection");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const premiumRouter = require("./routes/premiumRouter");
const passwordRouter = require("./routes/password");

const cors = require("cors");

const User = require("./models/usersTable");
const Expense = require("./models/expenseTable");

const Order = require("./models/orderTable");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(loginRouter);
app.use("/expense", expenseRouter);
app.use(purchaseRouter);
app.use("/premium", premiumRouter);
app.use("/password", passwordRouter);

User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(() => {
  console.log(`Tables Synced`);
  app.listen(port, () => {
    console.log(`Server is Running on port:http://localhost:${port}`);
  });
});
