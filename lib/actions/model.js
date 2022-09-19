#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const formatAttributes = require('../../utils/format_attributes');

class Model {

    static generate(modelName, attributes) {
        const modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelNameLowered = modelName.toLowerCase();

        fs.readFile(path.resolve(__dirname, '../snippets/model'), function(err, data) {
            attributes = formatAttributes(attributes);
            data = data.toString().split('<ModelName>').join(modelNameCapitalized);
            data = data.toString().split('<Attributes>').join(attributes);
            fs.writeFileSync(`models/${modelNameLowered}.js`, data.toString());
            fs.writeFileSync(`resources/${modelNameLowered}.js`, 'module.exports={}');
        });

        console.log('Model created!');

        
    }

    static undo(modelName) {
        const modelNameLowered = modelName.toLowerCase();
        fs.unlinkSync(`models/${modelNameLowered}.js`);
        fs.unlinkSync(`resources/${modelNameLowered}.js`);
        console.log('Model removed!');
    }

}

module.exports = Model;