const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./DB/Database");
const MainRouter = require("./Routes/MainRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//config Dotenv
dotenv.config({ path: "./Config/.env" });

//cookieParser
app.use(cookieParser());
//cors
app.use(
  cors({
    credentials: true,
    origin: "http://http://localhost:3000",
  })
);
//connect DB
connectDB(process.env.DBURI);
//BodyParse
app.use(express.json());

//MainRoute
app.use("/api", MainRouter);
//Entry Point
app.use("/", (req, res) => {
  res.send("<h1>This Website Is Working Fine. Click Here To Visit </h1>");
});
//Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
