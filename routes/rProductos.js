import express from 'express';

// Controladores
import Producto from '../controllers/Producto.js';

const ADMIN = false;

export default (io) => {
    const router = express.Router();

    router.use(function (req, res, next) {
        if(['agregar', 'borrar', 'actualizar'].some(e => req.originalUrl.includes(e)) && !ADMIN){
            return res.redirect('/failed');
        }
        next();
    });

    router.get('/:id?', function(req, res) {
        let producto = new Producto().index(req.params.id);
        console.log(req.id);
        res.send(producto);
    });

    router.post('/agregar', function(req, res) {
        new Producto().create({nombre: req.body.nombre, precio: req.body.precio, img: req.body.img, descripcion: req.body.descripcion, stock: req.body.stock, codigo: req.body.codigo});
        console.log(req.body.nombre);
        res.send('success');
    });

    router.put('/actualizar/:id', function(req, res) {
        res.send(new Producto().update({nombre: req.body.nombre, precio: req.body.precio, img: req.body.img, descripcion: req.body.descripcion, stock: req.body.stock, codigo: req.body.codigo, id: req.params.id}));
    });

    router.get('/borrar/:id', function(req, res) {
        res.send(new Producto().delete(req.params.id));
    });

    return router;
};