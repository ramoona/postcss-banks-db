import postcss from 'postcss';
import test    from 'ava';
import plugin from './';

const data = [
    {
        name: 'alfabank',
        country: 'ru',
        color: '#F22F17',
        code: 'ru-alfabank'
    },
    {
        name: 'ingbelgium',
        country: 'be',
        color: '#ff6600',
        code: 'be-ingbelgium'
    }
];

function run(t, input, output) {
    return postcss([ plugin({ data }) ]).process(input).then(result => {
        t.same(result.css, output);
        t.same(result.warnings().length, 0);
    });
}

test('fills template', t => {
    var input = '@banks-db-template {' +
                '    .billing-form.is-%code% {\n' +
                '        background-color: %color%\n' +
                '    }\n' +
                '}';
    var output = '.billing-form.is-ru-alfabank {\n' +
                 '    background-color: #F22F17\n' +
                 '}\n' +
                 '.billing-form.is-be-ingbelgium {\n' +
                 '    background-color: #ff6600\n' +
                 '}';
    return run(t, input, output);
});

test('fills template with real data', t => {
    var input = '@banks-db-template {' +
                '    .billing-form.is-%code% {\n' +
                '        background-color: %color%\n' +
                '    }\n' +
                '}';
    return postcss([ plugin ]).process(input).then(result => {
        t.ok(result.root.nodes.length > 2);
        t.same(result.warnings().length, 0);
    });
});

test('replace multiple strings', t => {
    var input = '@banks-db-template {' +
                '    .billing-form.is-%code% {\n' +
                '        border-color: %color% white %color%\n' +
                '    }\n' +
                '}';
    var output = '.billing-form.is-ru-alfabank {\n' +
                 '    border-color: #F22F17 white #F22F17\n' +
                 '}\n' +
                 '.billing-form.is-be-ingbelgium {\n' +
                 '    border-color: #ff6600 white #ff6600\n' +
                 '}';
    return run(t, input, output);
});
