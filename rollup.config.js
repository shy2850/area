const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

module.exports = {
    input: 'src/index.tsx',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    output: {
        name: 'AreaJsonp',
        globals: {
            preact: 'preact'
        },
        sourcemap: true,
        file: 'bundle.js',
        format: 'umd'
    }
}