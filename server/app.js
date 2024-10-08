// const express = require('express');
// const app = express();
// const port = 5500

// //db connnection 
// const dbConnection =require("./db/dbConfig")

// //user routes middleware
// const userRoutes = require("./routes/userRoute")

// // jason middleware to exract json data 
// app.use(express.json())

// // user routes middleware
// app.use("/api/users", userRoutes)

// async function start() {
//     try{
//         const result = await dbConnection.execute("select 'test'")
//         await app.listen(port)
//         console.log("database connection established");
//         console.log('listening on ${port}');
//     } catch(error) {
//         console.log(error.message);
//     }
// }
// start()


// app.listen(port, (err) =>{
//     if (err) {
//         console.log((err));
//     }
//     else {
//         console.log(`listening on ${port}`);
//     }
// }
const express = require('express');
const app = express();
const port = 5500;

// db connection 
const dbConnection = require("./db/dbConfig");

// user routes middleware
const userRoutes = require("./routes/userRoute");

// middleware to extract JSON data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

async function start() {
  try {
    // Test the DB connection
    const result = await dbConnection.execute("select 'test'");
    console.log("Database connection established");

    // Start the server
    await app.listen(port);
    console.log(`Listening on port ${port}`);  // Fixed template literal
  } catch (error) {
    console.log(error.message);
  }
}

// Call start to initiate DB connection and server
start();
