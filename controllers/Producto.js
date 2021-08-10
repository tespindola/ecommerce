import fs from 'fs';
import moment from 'moment';

export default class Producto{
    constructor() {
        try {
            fs.readFileSync('./data/productos.json');
        } catch (error) {
            fs.writeFileSync('./data/productos.json', JSON.stringify([]));
        }
    }

    index(id){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        if(!id){
            return productos;
        }else{
            return productos.find(f => f.id == id) || {error: 'producto no encontrado'};
        }
    }

    create({nombre, precio, img, descripcion, stock, codigo}){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        productos.push({
            nombre,
            precio,
            img,
            descripcion,
            stock,
            codigo,
            timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
            id: productos.length + 1,
        });
        console.log(productos);
        fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

        return productos[productos.length-1];
    }

    update({nombre, precio, img, descripcion, stock, codigo, id}){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        if(productos.find(f => f.id == id)){
            let producto_edit = productos.find(f => f.id == id);
            let index = productos.findIndex(f => f.id == id);
            producto_edit.nombre = nombre || producto_edit.nombre;
            producto_edit.precio = precio || producto_edit.precio;
            producto_edit.img = img || producto_edit.img;
            producto_edit.descripcion = descripcion || producto_edit.descripcion;
            producto_edit.stock = stock || producto_edit.stock;
            producto_edit.codigo = codigo || producto_edit.codigo;
            productos[index] = producto_edit;
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

            return producto_edit;
        }else{
            return {msg: 'Producto no encontrado'};
        }
    }

    delete(id){
        let productos = JSON.parse(fs.readFileSync('./data/productos.json'));
        let index = productos.findIndex(f => f.id == id);
        if(index != -1){
            productos.splice(index, 1);
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos));

            return {msg: 'Producto eliminado'};
        }else{
            return {msg: 'Producto no encontrado'};
        }
    }
    

}