import { AbstractDataSource } from "./abstractDataSource";
import { Product } from "./entities";
import axios from 'axios'

const protocol = 'http'
const host = 'localhost'
const port = 4600

const urls = process.env.NODE_ENV === 'development' ? ({
    products: `${protocol}://${host}:${port}/products`,
    orders: `${protocol}://${host}:${port}/orders`
}) : ({
    products: '/api/products',
    orders: '/api/orders'
})

export class RemoteDataSource extends AbstractDataSource {

    async loadProducts(): Promise<Product[]> {
        const res = await axios.get(urls.products)
        return res.data
    }

    async storeOrder(): Promise<number> {
        const orderData = {
            lines: this.order.orderLines.map(line => ({productId: line.product.id, productName: line.product.name, quantity: line.quantity})),
            total: this.order.total
        }
        return axios.post(urls.orders, orderData).then(response => response.data.id)
    }
}