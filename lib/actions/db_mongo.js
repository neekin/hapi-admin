#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class DbMongo {

    static generate() {
        fs.readFile(path.resolve(__dirname, '../snippets/db_mongo'), function(err, data) {
            fs.writeFileSync(`config/database.js`, data.toString());
        });
    
        console.log('Database config created!');
    }

    static undo() {
        fs.unlinkSync('config/database.js');

        console.log('Removed database config!');
    }

}

module.exports = DbMongo;