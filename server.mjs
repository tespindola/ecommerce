// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import getConnection from './config/configMongo.mjs';
import dotenv from 'dotenv'; 
dotenv.config (); 
/* import path from 'path';
import {Server} from 'socket.io'; */

// Routes
import rProductos from './routes/rProductos.mjs';
import rCarrito from './routes/rCarrito.mjs';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const server = http.createServer(app);

const PUERTO = process.env.PORT || 8080;

/* getConnection().then((msj) => {
    console.log(msj);
    server.listen(PUERTO, () => {
        console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
    });
    server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));
}).catch((e) => console.log(e)); */
server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));

app.use('/api/productos', rProductos());
app.use('/api/carrito', rCarrito());

app.get('/', (req, res) => {
    res.send('F');
});

app.get('/failed', (req, res) => {
    res.send('Autorization failed');
});