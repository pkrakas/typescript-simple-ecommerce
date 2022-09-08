import { createElement } from "./tools/jsxFactory"

export class CategoryList {
    
    props: {
        categories: string[],
        selected: string,
        callback: (category: string) => void
    }

    getContent() {
        return (
            <div>
                {['All', ...this.props.categories].map(c => this.getButton(c))}
            </div>
        )
    }

    getButton(cat) {
        const selected = this.props.selected === undefined ? 'All' : this.props.selected
        const btnClass = selected === cat ? 'btn-primary' : 'btn-secondary'
        return (
            <button className={`btn ${btnClass} w-100 mb-2`} onclick={() => this.props.callback(cat)}>{cat}</button>
        )
    }
}