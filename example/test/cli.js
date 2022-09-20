#!/usr/bin/env node

const { program } = require('commander')
const package = require('../../package.json')
const registerCommand = require('../../lib/command')
registerCommand(program)


program.name('hapi-admin')
    .description('hapi-admin 一些生成代码的命令')
    .version(package.version);

program.parse(process.argv)