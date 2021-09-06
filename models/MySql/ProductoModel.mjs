import Model from './Model.mjs';

export default class ProductoModel extends Model{
    constructor() {
        super('productos', ['code', 'name', 'description', 'img', 'stock', 'price', 'created_at', 'updated_at', 'deleted_at']);
    }
}