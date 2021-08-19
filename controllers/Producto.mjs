import moment from 'moment';
import ProductoModel from '../models/ProductoModel.mjs';

export default class Producto{
    constructor() {
        this.productoModel = new ProductoModel();
    }

    async index(id){
        let productos = await this.productoModel.select();
        if(!id){
            return productos;
        }else{
            return productos.find(f => f.id == id) || {error: 'producto no encontrado'};
        }
    }

    async create({name, price, img, description, stock, code}){
        let producto = await this.productoModel.create({
            name,
            price,
            img,
            description,
            stock,
            code,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        
        return producto;
    }

    async update({name, price, img, description, stock, code, id}){
        let producto = await this.productoModel.update({
            name,
            price,
            img,
            description,
            stock,
            code,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }, id);
        
        return producto;
    }

    async delete(id){
        await this.productoModel.delete(id);

        return {msg: 'Producto eliminado'};
    }
    

}