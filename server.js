// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';
import http from 'http';
import {Server} from 'socket.io';

// Routes
import rProductos from './routes/rProductos.js';
import rCarrito from './routes/rCarrito.js';

// Controladores
/* import Producto from './controllers/Producto.js';
import Carrito from './controllers/Carrito.js'; */

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const server = http.createServer(app);

const PUERTO = process.env.PORT || 8080;

server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));

/* app.engine("hbs", handlebars({
    extname: 'hbs',
    partialsDir: `${path.resolve()}/views/hbs/products`,
}));

app.set('view engine', 'hbs');
app.set('views', './views/hbs/');

app.use(express.static(`${path.resolve()}/public`)); */

app.use('/api/productos', rProductos());
app.use('/api/carrito', rCarrito());

app.get('/failed', (req, res) => {
    res.send('Autorization failed');
});