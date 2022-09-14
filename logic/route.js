#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const FileEdit = require('../utils/file_edit');

class Route {

    static generate(modelName) {
        const routeName = pluralize.plural(modelName);
        const routeNameLowered = routeName.toLowerCase();
        const controllerNameCapitalized = routeName.charAt(0).toUpperCase() + routeName.slice(1);
        const controllerNameLowered = routeName.toLowerCase();

        fs.readFile(path.resolve(__dirname, '../snippets/route'), function(err, data) {
            data = data.toString().split('<RouteNameLowered>').join(routeNameLowered);
            data = data.toString().split('<ControllerNameCapitalized>').join(controllerNameCapitalized);
            data = data.toString().split('<ControllerNameLowered>').join(controllerNameLowered);
            fs.writeFileSync(`routes/${routeNameLowered}.js`, data.toString());
        });

        console.log('Route created!');
    }

    static undo(modelName) {
        const routeNameLowered = pluralize.plural(modelName.toLowerCase());
        fs.unlinkSync(`routes/${routeNameLowered}.js`);

        console.log('Route removed!');
    }

    static register(modelName) {
        const fileName = 'index.js';
        const routeName = pluralize.plural(modelName);
        const searchText = 'server.register';
        const text = `\t\t{ plugin: require(\'./routes/${routeName}\'),options:{prefix:'/api/v1',config:{tags:['api','${modelName}']}} },\n`;
        
        FileEdit.injectTextToFile(fileName, searchText, text);
        
        // adminResources
        FileEdit.injectTextToFile(fileName, 'const adminResources',`\t\t{ resource: require(\'./models/${modelName}\'),options:{ properties:{...visibleProperties} } },\n`);

        console.log('Route registered!');
    }

    static unregister(modelName) {
        const fileName = 'index.js';
        const routeName = pluralize.plural(modelName);
        const searchText = `plugin: require(\'./routes/${routeName}\')`;
        
        FileEdit.removeTextFromFile(fileName, searchText);

        console.log('Route unregistered!');
    }

}

module.exports = Route;