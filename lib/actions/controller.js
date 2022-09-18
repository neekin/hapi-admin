#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

class Controller {

    static generate(modelName) {
        const modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelNameLowered = modelName.toLowerCase();
        const controllerName = pluralize.plural(modelName);
        const controllerNameCapitalized = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
        const controllerNameLowered = controllerName.toLowerCase();

        fs.readFile(path.resolve(__dirname, '../snippets/controller'), function(err, data) {
            data = data.toString().split('<ModelNameCapitalized>').join(modelNameCapitalized);
            data = data.toString().split('<ModelNameLowered>').join(modelNameLowered);
            data = data.toString().split('<ControllerNameCapitalized>').join(controllerNameCapitalized);
            data = data.toString().split('<ServiceNameCapitalized>').join(controllerNameCapitalized);
            data = data.toString().split('<ServiceNameLowered>').join(controllerNameLowered);
            fs.writeFileSync(`controllers/${controllerNameLowered}_controller.js`, data.toString());
        });

        console.log('Controller created!');
    }

    static undo(modelName) {
        const controllerNameLowered = pluralize.plural(modelName.toLowerCase());
        fs.unlinkSync(`controllers/${controllerNameLowered}_controller.js`);

        console.log('Controller removed!');
    }

}

module.exports = Controller;