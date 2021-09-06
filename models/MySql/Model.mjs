import db from '../config/database.mjs';

export default class Model {
    constructor(table, columns) {
        this.table = table;
        this.columns = columns;
    }

    async create(data){
        let id = await db(this.table).insert(data);
        let row = await this.find(id);

        return row;
    }

    async find(id){
        return await db(this.table).where('id', id).first();
    }

    async select(columns=undefined){
        return await db(this.table).select(columns || '*');
    }

    async update(data, id){
        await db(this.table).where('id', id).update(data);
        let row = await this.find(id);

        return row;
    }

    async delete(id){
        await db(this.table).where('id', id).del();

        return true;
    }


}