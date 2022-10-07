const Init = require('./actions/init');
const DbMongo = require('./actions/db_mongo');
const Model = require('./actions/model');
const Route = require('./actions/route');
const Service = require('./actions/service');
const Controller = require('./actions/controller');
const Page = require('./actions/page');

const undoScaffold = (name) => {
    Model.undo(name);
    Service.undo(name);
    Controller.undo(name);
    Route.undo(name);
}
const generateScaffold = (name, options) => {
    Model.generate(name, options);
    Service.generate(name);
    Controller.generate(name);
    Route.generate(name);
}

module.exports = function (program) {

    program.command('init')
        .description('初始化项目目录')
        .option('-D,--database <database>', '初始化数据库配置,暂时仅支持monogodb')
        .action((options) => {
            if (options.database == 'mongo') {
                Init.generate(true);
                DbMongo.generate();
            }else{
                Init.generate();
            }
        })


    program.command('generate <type> <name> [options...]').alias('g')
        .description('生成资源命令')
        .action((type, name, options) => {
            switch (type) {
                case 'scaffold': generateScaffold(name, options); break;
                case 'model': Model.generate(name, options); break;
                case 'controller': Controller.generate(name); break;
                case 'service': Service.generate(name); break;
                case 'route': Route.generate(name); break;
                case 'page': Page.generate(name,options);break;
                default:
                    console.error('资源类型错误')
                    return;
            }
        })

    program.command('destory <type> [name]').alias('d')
        .description('删除资源命令')
        .action((type, name) => {
            if (type != 'init' && !name) {
                console.error('请输入资源名称')
                return
            }
            switch (type) {
                case 'init': Init.undo(); break;
                case 'scaffold': undoScaffold(name); break;
                case 'model': Model.undo(name); break;
                case 'controller': Controller.undo(name); break;
                case 'service': Service.undo(name); break;
                case 'route': Route.undo(name); break;
                case 'page': Page.undo(name);break;
                default:
                    console.error('资源类型错误')
                    return;
            }
        })
}