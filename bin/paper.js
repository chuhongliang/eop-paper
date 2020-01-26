#!/usr/bin/env node

/**
 * 程序入口
 */

const _ = require('underscore');

const cmds = ['create', 'build', 'server'];
const runners = [];
_.each(cmds, function (cmd) {
    runners[cmd] = require('./' + cmd + '_runner');
});

const help = function () {
    console.log('Usage:');
    console.log('    eop-paper -v or --version');
    console.log('    eop-paper -h or --help');
    console.log('    eop-paper command [options]');
    console.log('    eop-paper help command');
    console.log('');
    console.log('Commands:');
    console.log('    create - Create a new blog');
    console.log('    build  - Build all site from config and meta-text');
    console.log('    server - Start a new local web server for test and debug');
};

const version = function () {
    let pack = require('../package.json');
    console.log('Version: ' + pack.version);
}

const showHelp = function (cmd) {
    runners[cmd].help();
};

const checkArgs = function (args) {
    if (args.length >= 2) {
        if (args[1] === '-v' || args[1] === '--version') {
            version();
            process.exit(1);
        }
        if (args[1] === '-h' || args[1] === '--help') {
            help();
            process.exit(1);
        }
        if (args.length >= 3 && args[1] === 'help' && _.contains(cmds, args[2])) {
            showHelp(args[2]);
            process.exit(1);
        }
        if (!_.contains(cmds, args[1])) {
            help();
            process.exit(1);
        }
        return 0;
    } else {
        help();
        process.exit(1);
    }
};

let args = !(process.argv[0] === 'node' ||
    process.argv[0] === 'nodejs' ||
    process.argv[0].match(/node.exe$/) ||
    process.argv[0].match(/node$/)) ? process.argv : _.last(process.argv, process.argv.length - 1);

checkArgs(args);
let cmd = args[1];
let options = _.last(args, args.length - 2);

runners[cmd].run(options);

