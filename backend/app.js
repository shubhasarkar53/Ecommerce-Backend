// const express = require("express");

// const app = express();

// app.use(express.json());

// const productRoute = require("./routes/productRoute")

// // Routercall



// app.use("/api/v1",productRoute);




// module.exports = app;



// New again


const express = require("express");
const cookieParser = require('cookie-parser')
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const errorMiddleWare = require("./middleWares/error")
const app = express();
app.use(express.json());
app.use(cookieParser());

// Product route
app.use("/api/v1",productRoute);

// user route
app.use("/api/v1",userRoute);


module.exports = app;


// Error middleware should be in last of the code
app.use(errorMiddleWare);