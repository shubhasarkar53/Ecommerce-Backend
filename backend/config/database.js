// const mongoose = require("mongoose");

// const dbConnect = () => {
//   mongoose
//     .connect(process.env.DB_URI)
//     .then(() => {
//       console.log("Database connected successfully!");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// module.exports = dbConnect;



const mongoose = require("mongoose");

const dbConnect = () =>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Db connected successfully!");
    })
    // .catch((err)=>{
    //     console.log("Error occured while connecting to the database");
    //     console.log(err.message);
    // })
}

module.exports = dbConnect;