// const express = require("express");
// const app = require("./app");
// const dbConnect = require("./config/database");
// const dotenv = require("dotenv");

// // config dotenv
// dotenv.config({path:"backend/config/.env"});

// //  database connection func
// dbConnect();

// const port = process.env.PORT;
// app.listen(port,()=>{
//     console.log(`server is working on port no:${port}`)
// })

  

// New agian

require("dotenv").config({path:"backend/config/.env"}); //syntax vul geya

//<------- uncaught ref err ------->

process.on("uncaughtException",(err)=>{
   console.log("Server is closing due to uncaughtException");
   console.log(`Error: ${err.message}`);
   process.exit(1);
})

// <------- end of uncaught ref err ------->

const dbConnect = require("./config/database");

const app = require("./app");
const port = process.env.PORT;

dbConnect();

const server = app.listen(port,()=>{
   console.log(`Listning to the port : ${port}`) 
})

// Unhandled promise rejection

process.on("unhandledRejection",(err)=>{
   console.log("Server is closing due to unhandledRejection");
   console.log(`Error: ${err.message}`);

   server.close(()=>{
      process.exit(1);
   });//now no need to use the catch block in mongodb connection.

})

