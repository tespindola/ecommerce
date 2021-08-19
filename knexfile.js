const dotenv = require('dotenv'); 
dotenv.config(); 

module.exports = {

    dev: {
        client: 'mysql',
        version: '5.7',
        connection: {
            host : process.env.DB_HOST || '127.0.0.1',
            user : process.env.DB_USER || 'root',
            password : process.env.DB_PASSWORD || '',
            database : process.env.DB_DATABASE || 'ecommerce'
        }
    },
    migrations: {
        directory: './migrations'
    }

};
