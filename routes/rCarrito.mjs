import express from 'express';

// Controladores
import Carrito from '../controllers/Carrito.mjs';

export default (io) => {
    const router = express.Router();
    
    router.get('/:id?', function(req, res) {
        let carrito = new Carrito().index(req.params.id);
        res.send(carrito);
    });

    router.post('/agregar/:producto_id/:carrito_id?', async function(req, res) {
        let add = await new Carrito().addProduct(req.params.producto_id, req.params.carrito_id);
        res.send(add);
    });

    router.delete('/borrar/:producto_id/:carrito_id', async function(req, res) {
        res.send(await new Carrito().removeProduct(req.params.producto_id, req.params.carrito_id));
    });

    return router;
};