import express from 'express';

// Controladores
import Carrito from '../controllers/Carrito.js';

export default (io) => {
    const router = express.Router();
    
    router.get('/:id?', function(req, res) {
        let carrito = new Carrito().index(req.params.id);
        res.send(carrito);
    });

    router.post('/agregar/:id', function(req, res) {
        let add = new Carrito().addProduct(req.params.id);
        res.send(add);
    });

    router.delete('/borrar/:id', function(req, res) {
        res.send(new Carrito().removeProduct(req.params.id));
    });

    return router;
};