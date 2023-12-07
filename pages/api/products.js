 import { db, onError } from "../../config";
// import Product from "../../models/Productspace";


import Product from '../../models/product';
//import connectDb from '../../config';



export default async (req, res) => {
     await db.connect();
    //connectDb()
  const { page, size  } = req.query;
  console.log( page ,size)
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }
  res.status(200).json({  totalPages ,totalDocs ,products });
};