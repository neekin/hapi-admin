#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

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

}

module.exports = Route;