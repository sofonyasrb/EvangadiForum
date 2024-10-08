const express = require("express");
const app = express();
const port = 5500;
const dbconnection = require("./db/dbConfig");

// Middleware to parse JSON bodies
app.use(express.json());

// //Question routes middleware file

const questionRoute = require("./routes/questionRoute");


// user routes middleware
// const userRoute = require("./routes/userRoute");
// app.use("/api/questions", questionRoute);

// //Question routes middleware
app.use("/api/questions", questionRoute);


async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
//calling start function
start();
