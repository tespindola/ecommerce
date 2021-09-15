import moment from 'moment';
import ProductoModel from '../models/ProductoModel.mjs';
import { nanoid } from 'nanoid';
import ProductoModelFirebase from '../models/ProductoModelFirebase.mjs';

export default class Producto{

    async index(id){
        if(!id){
            /* let productos = await ProductoModel.find();
            return productos; */
            let productos = await ProductoModelFirebase.get();
            return productos.docs.map(d => ({id: d.id, ...d.data()}));
        }else{
            /* let producto = await ProductoModel.findById(id);
            return producto; */
            let producto = await ProductoModelFirebase.doc(`${id}`).get();
            return producto.data();
        }
    }

    async create({name, price, img, description, stock, code}){
        let producto_id = nanoid();
        await ProductoModelFirebase.doc(`${ producto_id }`).create({
            name,
            price,
            img,
            description,
            stock,
            code,
        });
        let producto = await this.index(producto_id);
        /* let producto = await ProductoModel.create({
            name,
            price,
            img,
            description,
            stock,
            code,
        }); */
        
        return producto;
    }

    async update({name, price, img, description, stock, code, id}){
        await ProductoModelFirebase.doc(`${ id }`).update({
            name,
            price,
            img,
            description,
            stock,
            code,
        });
        let producto = await this.index(id);
        /* let producto = await ProductoModel.findByIdAndUpdate(id, {
            name,
            price,
            img,
            description,
            stock,
            code,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        }, {new: true}); */
        
        return producto;
    }

    async delete(id){
        /* await ProductoModel.findByIdAndDelete(id); */
        await ProductoModelFirebase.doc(`${id}`).delete();

        return {msg: 'Producto eliminado'};
    }
    

}