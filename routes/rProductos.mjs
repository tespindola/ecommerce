import express from 'express';

// Controladores
import Producto from '../controllers/Producto.mjs';

const ADMIN = true;

export default (io) => {
    const router = express.Router();

    router.use(function (req, res, next) {
        if(['agregar', 'borrar', 'actualizar'].some(e => req.originalUrl.includes(e)) && !ADMIN){
            return res.redirect('/failed');
        }
        next();
    });

    router.get('/:id?', async function(req, res) {
        let producto = await new Producto().index({id: req.params.id, nombre: req.query.nombre, code: req.query.code, fromPrice: req.query.fromPrice, toPrice: req.query.toPrice, fromStock: req.query.fromStock, toStock: req.query.toStock});
        res.send(producto);
    });

    router.post('/agregar', async function(req, res) {
        let producto = await new Producto().create({name: req.body.name, price: req.body.price, img: req.body.img, description: req.body.description, stock: req.body.stock, code: req.body.code});

        res.send({producto: producto});
    });

    router.put('/actualizar/:id', async function(req, res) {
        res.send(await new Producto().update({name: req.body.name, price: req.body.price, img: req.body.img, description: req.body.description, stock: req.body.stock, code: req.body.code, id: req.params.id}));
    });

    router.delete('/borrar/:id', async function(req, res) {
        res.send(await new Producto().delete(req.params.id));
    });

    return router;
};