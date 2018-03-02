import { getNode, TreeNode } from './MultiSelect'

const CALLBACK_NAME = 'area-jsonp'
let AreaTree: TreeNode[] = []

window[CALLBACK_NAME] = (paths: string[], children: TreeNode[]) => {
    if (!paths.length) {
        AreaTree = children
    } else {
        const node = getNode(AreaTree, paths)
        if (node) {
            node.children = children
        } else {
            throw new Error(`wrong Node:`)
        }
    }
}

export default (options: {base: string}) => (paths = [], callback = (tree: TreeNode[]) => {}) => {
    const node = getNode(AreaTree, paths)
    if (node && (!node.children || node.children.length != 0)) {
        return callback(AreaTree)
    }
    const script = document.createElement('script')
    script.addEventListener('load', e => {
        callback && callback(AreaTree)
        document.body.removeChild(script)
    })
    script.src = `${options.base}${paths.concat('1.js').join('/')}`
    document.body.appendChild(script)
}