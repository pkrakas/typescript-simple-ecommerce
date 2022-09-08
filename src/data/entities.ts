export type Product = {
    id: number,
    name: string,
    description: string,
    category: string,
    price: number
}

export class OrderLine {
    private _product: Product
    private _quantity: number

    constructor(_product: Product, _quantity: number) {
        this._product = _product
        this._quantity = _quantity
    }

    get product(): Product {
        return this._product
    }

    get quantity(): number {
        return this._quantity
    }

    get total(): number {
        return this._product.price * this._quantity
    }

    add(amount: number) {
        this._quantity += amount
    } 
}

export class Order {
    private lines: Map<number, OrderLine>

    constructor(initialLines?: OrderLine[]) {
        this.lines = new Map<number, OrderLine>()
        initialLines?.forEach(ol => this.lines.set(ol.product.id, ol))
        this.addProduct = this.addProduct.bind(this)
    }

    addProduct(product: Product, quantity: number) {
        if(this.lines.has(product.id)) {
            if(quantity === 0)
                this.lines.delete(product.id)
            else this.lines.get(product.id).add(quantity)
        } else this.lines.set(product.id, new OrderLine(product, quantity))
    }

    get orderLines(): OrderLine[] {
        return [...this.lines.values()]
    }

    get total(): number {
        return [...this.lines.values()].reduce((total, ol) => total += ol.product.price * ol.quantity, 0)
    }
}
