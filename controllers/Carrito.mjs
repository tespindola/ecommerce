import fs from 'fs';
import moment from 'moment';
import Producto from './Producto.mjs';

export default class Carrito{
    constructor() {
        try {
            fs.readFileSync('./data/carrito.json');
        } catch (error) {
            fs.writeFileSync('./data/carrito.json', JSON.stringify({id: 1, timestamp: moment().format('DD/MM/YYYY HH:mm:ss'), productos: []}));
        }
    }

    index(id){
        let carrito = JSON.parse(fs.readFileSync('./data/carrito.json'));
        if(!id){
            return carrito;
        }else{
            return carrito.productos.find(f => f.id) || {error: 'producto no encontrado'};
        }
    }

    addProduct(producto_id){
        let producto = new Producto().index(producto_id);
        if(producto.error != undefined){
            return producto;
        }

        let carrito = JSON.parse(fs.readFileSync('./data/carrito.json'));
        if(!carrito.productos.find(f => f.id == producto_id)){
            carrito.productos.push(producto);
            fs.writeFileSync('./data/carrito.json', JSON.stringify(carrito));
        }
        return {msg: 'El producto ya fue agregado'};
    }

    removeProduct(producto_id){
        let producto = new Producto().index(producto_id);
        if(producto.error != undefined){
            return producto;
        }

        let carrito = JSON.parse(fs.readFileSync('./data/carrito.json'));
        let index = carrito.productos.findIndex(f => f.id == producto_id);
        if(index != -1){
            carrito.productos.splice(index, 1);
            fs.writeFileSync('./data/carrito.json', JSON.stringify(carrito));
        }
        return {msg: 'El producto fue removido correctamente'};
    }
}