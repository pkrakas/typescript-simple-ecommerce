import { AbstractDataSource } from "./abstractDataSource";
import { Product } from "./entities";
import axios from 'axios'

const protocol = 'http'
const host = 'localhost'
const port = 4600

const urls = {
    products: `${protocol}://${host}:${port}/products`
}

export class RemoteDataSource extends AbstractDataSource {

    async loadProducts(): Promise<Product[]> {
        const res = await axios.get(urls.products)
        return res.data
    }
}