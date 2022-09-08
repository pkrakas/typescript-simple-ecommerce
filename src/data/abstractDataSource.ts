import { Order, Product } from "./entities";

export abstract class AbstractDataSource {
    private products: Product[]
    private categories: Set<string>
    private loading: Promise<void>
    public order: Order

    constructor() {
        this.products = []
        this.categories = new Set<string>()
        this.loading = this.getData()
        this.order = new Order()
    }

    async getData() {
        this.products = await this.loadProducts()
        this.products.forEach(p => this.categories.add(p.category))
    }

    abstract loadProducts(): Promise<Product[]>
    abstract storeOrder(): Promise<number>

    async getProducts(categoryFilter?: string) {
        await this.loading
        if(categoryFilter)
            return this.products.filter(p => p.category === categoryFilter)
        else return this.products
    }

    async getCategories() {
        await this.loading
        return [...this.categories.values()]
    }
}