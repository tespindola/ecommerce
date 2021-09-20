import fs from 'fs';
import moment from 'moment';
import Producto from './Producto.mjs';
import CarritoModel from '../models/CarritoModel.mjs';

export default class Carrito{

    async index(id){
        let carrito = await CarritoModel.find();
        if(id){
            return carrito.productos.find(f => f.id) || {error: 'producto no encontrado'};
        }
        return carrito;
    }

    async addProduct(producto_id, carrito_id=undefined){
        let carrito;
        if(!carrito_id){
            carrito = await CarritoModel.create({
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                productos: [],
            });
        }else{
            carrito = await CarritoModel.findById(carrito_id);
        }
        let producto = await new Producto().index(producto_id);
        if(producto.error != undefined){
            return producto;
        }

        if(!carrito.productos.find(f => f.id == producto_id)){
            carrito.productos.push(producto);
            await CarritoModel.findByIdAndUpdate(carrito._id, {...carrito});
        }
        return {msg: 'El producto ya fue agregado', carrito_id: carrito._id};
    }

    async removeProduct(producto_id, carrito_id){
        if(!carrito_id){
            return {msg: 'Debe ingresar un carrito id valido'}
        }
        let producto = await new Producto().index(producto_id);
        if(producto.error != undefined){
            return producto;
        }

        let carrito = await CarritoModel.findById(carrito_id);
        let index = carrito.productos.findIndex(f => f._id == producto_id);
        if(index != -1){
            carrito.productos.splice(index, 1);
            await CarritoModel.findByIdAndUpdate(carrito._id, {...carrito});
        }
        return {msg: 'El producto fue removido correctamente'};
    }
}