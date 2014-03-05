/**
 * Global adapter config
 *
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

    // If you leave the adapter config unspecified
    // in a model definition, 'default' will be used.
    'default': 'localPSQL',

    // Persistent adapter for DEVELOPMENT ONLY
    // (data is preserved when the server shuts down)
    disk: {
        module: 'sails-disk'
    },

    // MySQL is the world's most popular relational database.
    // Learn more: http://en.wikipedia.org/wiki/MySQL
    myLocalMySQLDatabase: {

        module: 'sails-mysql',
        host: 'localhost',
        user: 'root',
        // Psst.. You can put your password in config/local.js instead
        // so you don't inadvertently push it up if you're using version control
        password: 'beachbody',
        database: 'taskous_db'
    },

    localPSQL: {
        module: 'sails-postgresql',
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'taskous_db',
        port: 5432
    },

    herokuDB: {
        module: 'sails-postgresql',
        host: 'ec2-107-22-163-140.compute-1.amazonaws.com',
        user: 'pmxzitubibzjnb',
        password: 'kXEY59-1WsbYwqYO-uOVD6UwA6',
        database: 'd6h10qedckh3p1',
        port: 5432
    }

//  herokuDB1: {
//      module: 'sails-postgresql',
//      url: "postgres://pmxzitubibzjnb:kXEY59-1WsbYwqYO-uOVD6UwA6@ec2-107-22-163-140.compute-1.amazonaws.com:5432/d6h10qedckh3p1", //process.env.DATABASE_URL,
//      schema: true
////      module: 'sails-mysql',
////      host: 'localhost',
////      user: 'postgres',
//      // Psst.. You can put your password in config/local.js instead
//      // so you don't inadvertently push it up if you're using version control
////      password: 'root',
////      database: 'taskous_db'
//  }
};