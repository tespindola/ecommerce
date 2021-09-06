import moment from 'moment';
import ProductoModel from '../models/ProductoModel.mjs';

export default class Producto{

    async index(id){
        if(!id){
            let productos = await ProductoModel.find();
            return productos;
        }else{
            let producto = await ProductoModel.findById(id);
            return producto;
        }
    }

    async create({name, price, img, description, stock, code}){
        let producto = await ProductoModel.create({
            name,
            price,
            img,
            description,
            stock,
            code,
        });
        
        return producto;
    }

    async update({name, price, img, description, stock, code, id}){
        let producto = await ProductoModel.findByIdAndUpdate(id, {
            name,
            price,
            img,
            description,
            stock,
            code,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }, {new: true});
        
        return producto;
    }

    async delete(id){
        await ProductoModel.findByIdAndDelete(id);

        return {msg: 'Producto eliminado'};
    }
    

}