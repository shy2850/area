const { argv } = process
const build = argv[argv.length - 1] === 'build'
const areas = require('./lib/areas')

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    onSet (pathname, data, store) {
        if ('index.html' === pathname) {
            store._set('areas', areas)
        }
    },
    buildFilter: (pathname) => /^(src|index)/.test(pathname),
    middlewares: [
        {
            middleware: 'template',
            test: /\.html?/
        },
        {
            middleware: 'rollup'
        }
    ],
    output: require('path').join(__dirname, './docs')
}
