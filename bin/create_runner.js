/**
 * 生成一个新的papery站点
 */

const _ = require('underscore');
const fs = require('fs');
const fse = require('fs-extra');
const log4js = require('log4js');
const logger = log4js.getLogger();

function _help() {
    console.log('Usage: eop-paper create <root>');
    console.log('    root - Root directory of blog');
}

exports.help = function () {
    _help();
};

exports.run = function (options) {
    let root;
    if (_.size(options) >= 1) {
        root = options[0];
    } else {
        _help();
        return;
    }

    let startup = __dirname + '/../startup';
    if (!fs.existsSync(startup)) {
        logger.error('Startup templates can not be found! Please reinstall your papery');
        process.exit(1);
    }

    let src = startup;
    let dest = root;
    fse.copySync(src, dest);

    logger.info('Woo! A new blog was born in ' + dest);
};

