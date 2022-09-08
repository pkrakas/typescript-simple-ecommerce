import { Order } from "./data/entities"
import { createElement } from "./tools/jsxFactory"
import "./cartDetails.css"

export class CartDetails {

    props: {
        order: Order
    }

    getContent() {
        return <table className="table">
            <thead>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </thead>
            <tbody>
            {
                this.props.order.orderLines.map(orderLine => <tr>
                    <td>{orderLine.product.name}</td>
                    <td>{orderLine.quantity}</td>
                    <td>${orderLine.product.price.toFixed(2)}</td>
                    <td>${orderLine.total}</td>
                </tr>)
            }
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    ${this.props.order.total.toFixed(2)}
                </td>
            </tr>
            </tbody>
        </table>
    }
}