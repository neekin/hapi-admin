const inquirer = require('inquirer')

inquirer.prompt([
    {type:"input",name:"projectName",message:"你想用的工程名称"},
    {type:"list",name:"framwork",choices:['hapi'],message:"选择支撑的后台框架"},
    {type:"list",name:"database",choices:['mongodb'],message:"选择数据库类型"},
    {type:"checkbox",name:"other",choices:[{name:"jwt"},{name:'swagger'},{name:'admin'}],message:"其他选项"},
]).then(console.log)