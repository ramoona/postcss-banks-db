var postcss = require('postcss');
var banksDB = require('banks-db');

function replace(bank, str) {
    for (var i in bank) {
        var regexp = new RegExp('%' + i + '%', 'g');
        str = str.replace(regexp, bank[i]);
    }
    return str;
}

module.exports = postcss.plugin('postcss-banks-db', function (opts) {
    opts = opts || {};
    var data = opts.data || banksDB.data;

    return function (css) {
        css.walkAtRules('banks-db-template', function (template) {
            data.forEach(function (bank) {
                var clone = template.clone();
                clone.walk(function (node) {
                    if (node.type === 'atrule') {
                        node.name = replace(bank, node.name);
                        node.params = replace(bank, node.params);
                    } else if (node.type === 'rule') {
                        node.selector = replace(bank, node.selector);
                    } else if (node.type === 'decl') {
                        node.prop = replace(bank, node.prop);
                        node.value = replace(bank, node.value);
                    }
                });
                template.parent.insertBefore(template, clone.nodes);
            });
            template.remove();
        });
    };
});
