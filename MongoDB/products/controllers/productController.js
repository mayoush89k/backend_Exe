import Product from "../models/productModel.js";

export const getAllProducts = async (req,res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    next({ message: error.message });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = Product.findById(id);
    res.send(product);
  } catch (error) {
    next({ message: error.message });
  }
};
export const updateProduct = (req, res, next) => {
  try {
  } catch (error) {
    next({ message: error.message });
  }
};
export const deleteProductById = (req, res, next) => {
  try {
  } catch (error) {
    next({ message: error.message });
  }
};
