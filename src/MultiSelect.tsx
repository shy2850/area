import { h, Component } from 'preact'

export interface TreeNode {
    name: string
    code: string
    children?: TreeNode[]
}
export interface PropsType extends StateType{
    update: {
        (paths: string[], callback: { (tree: TreeNode[]): void }): void
    }
    onChange?: {
        (paths: string[]): void
    }
}
export interface StateType {
    tree?: TreeNode[]
    paths?: string[]
}

export const getNode = (tree: TreeNode[], paths: string[]): TreeNode => {
    if (!tree || !paths || !paths.length) {
        return tree ? { name: 'root', code: '-1', children: tree } : null
    }
    let node = null
    for (let i = 0; i < paths.length; i++) {
        let code = paths[i]
        if (!code) {
            return {
                name: 'empty',
                code: ''
            }
        }

        for (let j = 0; j < tree.length; j++) {
            let cur = tree[j]
            if (cur.code === code) {
                node = cur
                break
            }
        }
        if (!node) {
            return null
        } else if (i === paths.length - 1) {
            return node
        } else {
            tree = node.children
            node = null
        }
    }
}
class MultiSelect extends Component<PropsType, StateType> {
    props: PropsType
    state: StateType
    paths = []
    constructor(props: PropsType) {
        super(props)
        this.state = {
            paths: props.paths,
            tree: props.tree
        }
    }
    onChange = (paths: string[]) => {
        const t = this
        const { onChange } = t.props
        const { tree } = t.state
        onChange && onChange(paths)
        t.setValue(paths)
    }
    setValue = (paths = []) => {
        const t = this
        const { update } = t.props
        const loopInit = function loopInit(p) {
            if (p.length === paths.length) {
                update(paths, tree => {
                    t.setState({ paths, tree })
                })
            } else {
                update(p, () => loopInit(p.concat(paths[p.length])))
            }
        }
        loopInit([])
    }
    componentDidMount () {
        const t = this
        const { paths } = t.props
        t.setValue(paths)
    }
    
    render () {
        const { tree = [], paths = [] } = this.state

        return <div className="multi-select">
            <select onChange={(e) => this.onChange([e.target['value']])}>
                <option value="">请选择</option>
                {tree.map(({name, code}) => <option key={code} value={code} selected={code === paths[0]}>{name}</option>)}
            </select>
            {paths.map((p, i) => {
                const curPaths = paths.slice(0, i + 1)
                const node = getNode(tree, curPaths)
                return !!(node && node.children) && <select key={`${i}`} onChange={(e) => this.onChange(curPaths.concat(e.target['value']))}>
                    <option value="">请选择</option>
                    {node.children.map(({ name, code }) => <option key={code} value={code} selected={code === paths[i+1]}>{name}</option>)}
                </select>
            })}
        </div>
    }
}

export default MultiSelect