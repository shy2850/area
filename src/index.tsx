import { h, render } from 'preact'
import fetchProvider from './fetchProvider'
import MultiSelect, { getNode } from './MultiSelect'

interface AreaJsonpInputOptions {
    paths: string[]
    base: string
    el: HTMLElement
    onChange: {
        (paths: string[]): void
    }
}

export default function (options: AreaJsonpInputOptions) {
    const { base, el, onChange, paths } = options
    const fetch = fetchProvider({base})
    render(<MultiSelect update={fetch} onChange={onChange} paths={paths}/>, el)
}