// const express = require("express");
// const Product = require("../models/productModel");
// const ErrorHandler = require("../utills/errorHandler");

// // Create a product
// exports.createProduct = async (req,res,next) =>{
//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success:true,
//         product
//     })
// }

// // Get all the products
// exports.getAllProducts =  async (req,res,next)=>{

//     const products = await Product.find();

//     res.status(200).json({
//         success:true,
//         products
//     })
// }

// // Get product by id
// exports.getProductById =  async (req,res,next)=>{

//     const product = await Product.findById(req.params.id);
//     console.log("Here")
//     if(!product){
//         console.log("Inside")
//         return(next(new ErrorHandler("Product Not Found",404)));
//     }
//     console.log("Outside")
//     res.status(200).json({
//         success:true,
//         product
//     })

// }

// // update products by id
// exports.updateProduct =  async (req,res,next)=>{

//     try {
//         let product = await Product.findById(req.params.id);

//         if(!product){
//            return res.status(404).json({
//                 success:false,
//                 message:"Product not found"
//             })
//         }

//         product = await Product.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true,
//             useFindAndModify:false
//         });

//         res.status(200).json({
//             success:true,
//             product
//         })

//     } catch (error) {
//         res.status(500).json({
//                 success:false,
//                 message:"Product not found",
//                 messageDefault:error.message
//             })
//     }

// }

const { catchAsyncErr } = require("../middleWares/catchAsyncErr");
const Product = require("../models/productModel");
const ErrorHandler = require("../utills/errorHandler");
const ApiFeatures = require("../utills/apiFeatures");

// Create product

exports.createProduct = catchAsyncErr(async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

// View products

exports.getAllProducts = catchAsyncErr(async (req, res, next) => {
  const resultPerPage = 2;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// product details
exports.productDetails = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found !"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product

exports.updateProductDetails = catchAsyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found !"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Updated Successfully",
    product,
  });
});

// Delete product
exports.deleteProduct = catchAsyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found !"));
  }

  product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
    product,
  });
});

// exports.deleteProduct = catchAsyncFunc(async (req, res, next) => {
//   //catchAsyncError taking the whole function and do the work of try - catch
//   let product = await Product.findById(req.params.id);

//   if (!product) {
//     if (!product) {
//       return next(new ErrorHandler("Product not found", 404)); //custom made ErrorHandler / Error is thrown which taking  a err msg as well as a statusCOde
//     }
//   }

//   //    await product.remove();

//   product = await Product.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     message: "Product deleted successfully",
//   });
// });