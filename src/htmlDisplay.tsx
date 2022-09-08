import { AbstractDataSource } from "./data/abstractDataSource"
import { createElement } from "./tools/jsxFactory"
import 'bootstrap/dist/css/bootstrap.css'
import { CategoryList } from "./categoryList"
import { ProductList } from "./productList"
import { Header } from "./header"

enum View {
    Products,
    CartDetails,
    Summary
}

export class HtmlDisplay {

    private element: HTMLElement
    private categorySelected: string
    private displayView: View

    props: {
        dataSource: AbstractDataSource
    }

    constructor() {
        this.element = document.createElement('div')
        this.displayView = View.Products
        this.selectCategory = this.selectCategory.bind(this)
    }

    async getContent() {
        await this.updateContent()
        return this.element
    }

    async updateContent() {
        const products = await this.props.dataSource.getProducts(this.categorySelected)
        const categories = await this.props.dataSource.getCategories()
        this.element.innerHTML = ""
        switch(this.displayView) {
            case View.Products : {
                this.element.appendChild(this.layout(this.displayProducts(products, categories)))
                break;
            }
            case View.CartDetails : {
                this.element.appendChild(this.layout(this.displayCartDetails()))
                break;
            }
        }
    }

    switchView(view: View) {
        this.displayView = view
        this.updateContent()
    }

    layout(children: HTMLElement) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-2">
                        <Header orderTotalValue={this.props.dataSource.order.total} openCartDetails={() => this.switchView(View.CartDetails)}/>
                    </div>
                </div>
                {children}
            </div>
        )
    }

    displayProducts(products, categories) {
        return (
            <div className="row">
                <div className="col-3">
                    <CategoryList categories={categories} selected={this.categorySelected} callback={this.selectCategory} />
                </div>
                <div className="col-9">
                    <ProductList products={products} addToCart={(product, quantity) => {
                        this.props.dataSource.order.addProduct(product, quantity)
                        this.updateContent()
                    }} />
                </div>
            </div>
        )
    }

    displayCartDetails() {
        return <div>Cart details</div>
    }

    selectCategory(category) {
        this.categorySelected = category === 'All' ? undefined : category
        this.updateContent()
    }



}