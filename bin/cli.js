#!/usr/bin/env node

const Init = require('../lib/actions/init');
const DbMongo = require('../lib/actions/db_mongo');
const Model = require('../lib/actions/model');
const Route = require('../lib/actions/route');
const Service = require('../lib/actions/service');
const Controller = require('../lib/actions/controller');

const [,, ...args] = process.argv;
const validOptions = [ 'init','generate', 'destory','d','g' ]

if (validOptions.indexOf(args[0]) == -1) {
    console.log('Invalid options');
    return;    
}

if (args[0] == 'init') {
    Init.generate();
    if((args[1]=='-D' || args[1]=='--database') && args[2]=='mongo'){
        DbMongo.generate();
    }
}


if (args[0] == 'generate' || args[0]=='g') {
    if ((args[1] == 'model' || args[1].toLocaleLowerCase()=='m') && args[2] != undefined) {
        const attributes = args.slice(3);
        Model.generate(args[2], attributes);
    }
    if (args[1] == 'route' && args[2] != undefined) {
        Route.generate(args[2]);
        Route.register(args[2]);
    }
    if (args[1] == 'service' && args[2] != undefined) {
        Service.generate(args[2]);
    }
    if ((args[1] == 'controller' || args[1] == 'c' ) && args[2] != undefined) {
        Controller.generate(args[2]);
    } 
    if (args[1] == 'scaffold') {
        const attributes = args.slice(3);
        Model.generate(args[2], attributes);
        Service.generate(args[2]);
        Controller.generate(args[2]);
        Route.generate(args[2]);
        Route.register(args[2]);
    }
}

if (args[0] == 'destory' || args[0]=='d') {
    if (args[1] == 'init') {
        Init.undo();
    }
    if (args[1] == 'db') {
        DbMongo.undo();
    } else if ((args[1] == 'model' || args[1] == 'm') && args[2] != undefined) {
        Model.undo(args[2]);
    } else if (args[1] == 'route' && args[2] != undefined) {
        Route.undo(args[2]);
        Route.unregister(args[2]);
    } else if (args[1] == 'service' && args[2] != undefined) {
        Service.undo(args[2]);
    } else if ((args[1] == 'controller' || args[1] == 'c') && args[2] != undefined) {
        Controller.undo(args[2]);
    } else if (args[1] == 'scaffold') {
        Model.undo(args[2]);
        Service.undo(args[2]);
        Controller.undo(args[2]);
        Route.undo(args[2]);
        Route.unregister(args[2]);
    }
}