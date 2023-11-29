// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,"Please enter Product name first"]
//     },
//     description:{
//         type:String,
//         required:[true,"Please enter Product description first"]

//     },
//     price:{
//         type:Number,
//         required:[true,"Please enter Product price first"],
//         maxLength:[8,"This price  range is not allowed"]
//     },
//     rating:{
//         type:Number,
//         default:0
//     },
//     image:[
//         {
//             publicId:{
//                 type:String,
//                 required:true
//             },
//             url:{
//                 type:String,
//                 required:true
//             }
//         }
//     ],
//     category:{
//         type:String,
//         required:[true,"Please enter Product category first"],
//     },
//     stock:{
//         type:Number,
//         required:[true,"Please enter how many stock is available "],
//         maxLength:[4,"This stock range is not allowed"],
//         default:1
//     },
//     numberOfReviews:{
//         type:Number,
//         default:0
//     },

//     reviews:[
//         {
//             userName:{
//                 type:String,
//                 required:true
//             },
//             rating:{
//                 type:Number,
//                 required:true
//             },
//             comment:{
//                 type:String
//             }
//         }
//     ],

//     createdAt:{
//         type:Date,
//         default:Date.now
//     }

// })

// module.exports = mongoose.model("Product",productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product name first"],
  },
  description: {
    type: String,
    required: [true, "Please enter Product description first"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product price first"],
    maxLength: [8, "This price  range is not allowed"],
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Product category first"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter how many stock is available "],
    maxLength: [4, "This stock range is not allowed"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      userName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
