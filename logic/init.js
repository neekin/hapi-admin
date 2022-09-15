#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const folders = ['./config', './models', './routes', './services', './controllers','./resources'];

class Init {

    static generate() {
        fs.readFile(path.resolve(__dirname, '../snippets/index'), function(err, data) {
            fs.writeFileSync(`index.js`, data.toString());
        });

        for (var i = 0; i < folders.length; i++) {
            if (!fs.existsSync(folders[i])){
                fs.mkdirSync(folders[i]);
            }
        }
        fs.readFile(path.resolve(__dirname, '../snippets/route_init'), function(err, data) {
            fs.writeFileSync(`./routes/index.js`, data.toString());
        });
        fs.readFile(path.resolve(__dirname, '../snippets/resources_init'), function(err, data) {
            fs.writeFileSync(`./resources/index.js`, data.toString());
        });
    
        console.log('Initialized!');
    }

    static undo() {
        fs.unlinkSync('index.js');

        for (var i = 0; i < folders.length; i++) {
            fs.removeSync(folders[i]);
        }

        console.log('Destroyed!');
    }

}

module.exports = Init;