const config = require('./config')

module.exports = {
    test: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: config.dbPassword,
            database: 'ridehub'
        },
        debug: false,
        migrations: {
            directory: 'src/migrations',
        },
        seeds:{
            directory: 'src/seeds',
        }, 
        pool: {
            min: 0,
            max: 50,
            propagateCreateError: false,
        },
    },
};
