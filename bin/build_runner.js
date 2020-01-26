/**
 * 编译整个站点
 */

const _ = require('underscore');
const compiler = require('../lib/compiler');

function _help() {
    console.log('Usage: eop-paper build <root>');
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

    compiler.compile(root);
};

