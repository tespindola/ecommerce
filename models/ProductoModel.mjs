import mongoose from "mongoose";
const {Schema, model} = mongoose;

const productoSchema = new Schema({
    code: String,
    name: String,
    description: String,
    img: String,
    stock: Number,
    price: Number,
});

export default model('Producto', productoSchema);