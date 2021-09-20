import mongoose from "mongoose";
const {Schema, model} = mongoose;

const carritoSchema = new Schema({
    timestamp: Date,
    productos: Array,
});

export default model('Carrito', carritoSchema);