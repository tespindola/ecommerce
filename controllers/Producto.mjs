import moment from 'moment';
import ProductoModel from '../models/ProductoModel.mjs';
import { nanoid } from 'nanoid';
import ProductoModelFirebase from '../models/ProductoModelFirebase.mjs';
import faker from 'faker';

export default class Producto{

    async index({id, nombre, code, fromPrice, toPrice, fromStock, toStock}){
        if(!id){
            let filter = {};
            if(nombre){
                filter['name'] = nombre;
            }
            if(code){
                filter['code'] = code;
            }
            if(fromPrice){
                filter['price'] = {$gte: fromPrice};
            }
            if(toPrice){
                if(!filter['price']){
                    filter['price'] = {$lte: toPrice};
                }else{
                    filter['price']['$lte'] = toPrice;
                }
            }
            if(fromStock){
                filter['stock'] = {$gte: fromStock};
            }
            if(toStock){
                if(!filter['stock']){
                    filter['stock'] = {$lte: toStock};
                }else{
                    filter['stock']['$lte'] = toStock;
                }
            }
            let productos = await ProductoModel.find(filter);
            return productos;
            /* let productos = await ProductoModelFirebase.get();
            return productos.docs.map(d => ({id: d.id, ...d.data()})); */
        }else{
            try {                
                let producto = await ProductoModel.findById(id);
                return producto;
            } catch (error) {
                return {msg: 'No se encontro el producto'}
            }
            /* let producto = await ProductoModelFirebase.doc(`${id}`).get();
            return producto.data(); */
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

    test({cant_productos}){
        faker.locale = 'es_MX'
        if(!cant_productos){
            cant_productos = 10;
        }
        let productos = [];
        for (let i = 1; i <= cant_productos; i++) {
            productos.push({
                name: faker.commerce.product(),
                price: faker.commerce.price(),
                img: faker.random.image(),
                description: faker.commerce.productDescription(),
                stock: faker.datatype.number(),
                code: faker.datatype.uuid(),
            });
        }

        return productos;
    }
    

}