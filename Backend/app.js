const express = require("express");
const sequelize = require("./utils/dbConnection");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const expenseRouter = require("./routes/expenseRouter");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(loginRouter);
app.use("/expense", expenseRouter);

sequelize.sync().then(() => {
  console.log(`Tables Synced`);
  app.listen(port, () => {
    console.log(`Server is Running on port:http://localhost:${port}`);
  });
});
