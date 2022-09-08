import { Product } from "./data/entities"
import { createElement } from "./tools/jsxFactory"

export class ProductList {

    props: {
        products,
        addToCart: (product: Product, quantity:number) => void
    }

    getContent() {
        return this.props.products.map(product => <div className="card mb-2 p-2">
            <h4>
                {product.name}
                <span className="badge badge-pill bg-primary float-end">
                    ${product.price.toFixed(2)}
                </span>
            </h4>
            <div>
                {product.description}
            <button className="btn btn-success float-end" onclick={() => this.props.addToCart(product, 1)}>Add to cart</button>
            </div>
        </div>)
    }
}