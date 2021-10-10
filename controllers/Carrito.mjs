import moment from 'moment';
import CarritoModel from '../models/CarritoModel.mjs';

export default class Carrito{

    async index(id) {
		if (id) {
			try {
				// Buscame el carrito con el id que te pase
				const carrito = await CarritoModel.find({ _id: id });
				return carrito;
			} catch (error) {
				return { msg: "Error al buscar el carrito", error: error };
			}
		} else {
			const carrito = await CarritoModel.find();
			return carrito;
		}
	}

	async addProduct(producto_id, carrito_id) {
		// Si le paso id carrito y el id del producto
		if (carrito_id && producto_id) {
			try {
				// Buscame que el carrito y el producto existan o tirame un error
				const carrito = await CarritoModel.find({ _id: carrito_id });
				const producto = await ProductoModel.find({ _id: producto_id });

				// Actualiza el carrito con el id que ya sabemos que existe
				// y agrega el producto que ya sabemos que existe ;)
				await CarritoModel.updateOne(
					{ _id: carrito._id },
					{ $push: { productos: producto } }
				);
				return {
					msg: "El producto ya fue agregado",
					carrito_id: carrito._id,
				};
			} catch (error) {
				return { msg: "Error al agregar el producto ", error: error };
			}
		}

		//si no existe el carrito creo uno nuevo y agrego el producto
		if (!carrito_id && producto_id) {
			try {
				// IMPORTANTE primero busco el producto, si no existe me tira error
				const producto = await ProductoModel.find({ _id: producto_id });
				// Si existe creo el carrito. El modelo ya tiene un array vacio de productos
				// Si creo otro array aca voy a tener quilombo.
				const carrito = await CarritoModel.create({
					timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
				});

				// Actualiza el carrito con el id del que recien creamos y agregale el producto que ya sabemos que existe
				await CarritoModel.updateOne(
					{ _id: carrito._id },
					{ $push: { productos: producto } }
				);
				return {
					msg: "El producto ya fue agregado",
					carrito_id: carrito._id,
				};
			} catch (error) {
				return { msg: "Error al agregar el producto ", error: error };
			}
		}
	}

	async removeProduct(producto_id, carrito_id) {
		if (!carrito_id) {
			return { msg: "Debe ingresar un carrito id valido" };
		}
		try {
			// Lo mismo que antes, comproba que existen ambos si no tirame un error
			const producto = await ProductoModel.find({ _id: producto_id });
			const carrito = await CarritoModel.find({ _id: carrito_id });

			//Actualizame el carrito que encontraste y elimina del array productos
			// el producto con el id que encontramos antes ;)
			await CarritoModel.updateOne(
				{ _id: carrito[0]._id },
				{ $pull: { productos: { _id: producto[0]._id } } }
			);
			return {
				msg: "El producto ya fue eliminado con exito ",
				producto_id: producto._id,
			};
		} catch (error) {
			return { msg: "Error al borrar el producto ", error: error };
		}
	}
}