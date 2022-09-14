#!/usr/bin/env node

const Init = require('../logic/init');
const DbMongo = require('../logic/db_mongo');
const Model = require('../logic/model');
const Route = require('../logic/route');
const Service = require('../logic/service');
const Controller = require('../logic/controller');

const [,, ...args] = process.argv;
const validOptions = [ 'init', 'destroy', 'scaffold', 'generate', 'remove' ]

if (validOptions.indexOf(args[0]) == -1) {
    console.log('Invalid options');
    return;    
}

if (args[0] == 'init') {
    Init.generate();
}

if (args[0] == 'destroy') {
    Init.undo();
}

if (args[0] == 'generate') {
    if (args[1] == 'db:mongo') {
        DbMongo.generate();
    }
}

if (args[0] == 'scaffold') {
    if (args[1] == 'model' && args[2] != undefined) {
        const attributes = args.slice(3);
        Model.generate(args[2], attributes);
    } else if (args[1] == 'route' && args[2] != undefined) {
        Route.generate(args[2]);
        Route.register(args[2]);
    } else if (args[1] == 'service' && args[2] != undefined) {
        Service.generate(args[2]);
    } else if (args[1] == 'controller' && args[2] != undefined) {
        Controller.generate(args[2]);
    } else if (args[1] != undefined) {
        const attributes = args.slice(2);
        Model.generate(args[1], attributes);
        Service.generate(args[1]);
        Controller.generate(args[1]);
        Route.generate(args[1]);
        Route.register(args[1]);
    }
}

if (args[0] == 'remove') {
    if (args[1] == 'db') {
        DbMongo.undo();
    } else if (args[1] == 'model' && args[2] != undefined) {
        Model.undo(args[2]);
    } else if (args[1] == 'route' && args[2] != undefined) {
        Route.undo(args[2]);
        Route.unregister(args[2]);
    } else if (args[1] == 'service' && args[2] != undefined) {
        Service.undo(args[2]);
    } else if (args[1] == 'controller' && args[2] != undefined) {
        Controller.undo(args[2]);
    } else if (args[1] != undefined) {
        Model.undo(args[1]);
        Service.undo(args[1]);
        Controller.undo(args[1]);
        Route.undo(args[1]);
        Route.unregister(args[1]);
    }
}