const areas = require('./area')

const loop = function loop (arr, paths = [], mappings = {}) {
    const flattens = arr.map(a => {
        const { name, code, sub } = a
        let children
        if (sub) {
            mappings[code] = loop(sub, paths.concat(code), {})
            children = []
        }
        return { name, code, children }
    })
    mappings['_.js'] = `window['area-jsonp'] && window['area-jsonp'](${JSON.stringify(paths)}, ${JSON.stringify(flattens)});`
    return mappings
}

module.exports = loop(areas)