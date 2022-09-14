#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

class Service {

    static generate(modelName) {
        const serviceName = pluralize.plural(modelName);
        const serviceNameCapitalized = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        const serviceNameLowered = serviceName.toLowerCase();
        const modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelNameLowered = modelName.toLowerCase();

        fs.readFile(path.resolve(__dirname, '../snippets/service'), function(err, data) {
            data = data.toString().split('<ServiceNameCapitalized>').join(serviceNameCapitalized);
            data = data.toString().split('<ServiceNameLowered>').join(serviceNameLowered);
            data = data.toString().split('<ModelNameCapitalized>').join(modelNameCapitalized);
            data = data.toString().split('<ModelNameLowered>').join(modelNameLowered);
            fs.writeFileSync(`services/${serviceNameLowered}.js`, data.toString());
        });

        console.log('Service created!');
    }

    static undo(modelName) {
        const serviceNameLowered = pluralize.plural(modelName.toLowerCase());
        fs.unlinkSync(`services/${serviceNameLowered}.js`);

        console.log('Service removed!');
    }

}

module.exports = Service;