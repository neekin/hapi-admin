#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const folders = ['./config', './models', './routes', './services', './controllers','./resources'];

class Init {

    static generate(useDataBase) {
        let _empty = '_empty'
        if(useDataBase){
            _empty = ''
        }
        fs.readFile(path.resolve(__dirname, `../snippets/index${_empty}`), function(err, data) {
            fs.writeFileSync(`index.js`, data.toString());
        });

        for (var i = 0; i < folders.length; i++) {
            if (!fs.existsSync(folders[i])){
                fs.mkdirSync(folders[i]);
            }
        }
        console.log('Initialized!');
    }

    static undo() {
        try{
            fs.unlinkSync('index.js');
           
        }
        catch(e){
            console.log("没有找到对应的index.js")
        }
        finally {
            for (var i = 0; i < folders.length; i++) {
                fs.removeSync(folders[i]);
            }
    
            console.log('Destroyed!');
        }
       
    }

}

module.exports = Init;