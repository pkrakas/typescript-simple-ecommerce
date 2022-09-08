import { createElement } from "./tools/jsxFactory"

export class Header {

    props: {
        orderTotalValue: number,
        openCartDetails: () => void,
        openProductsList: () => void
    }

    getContent() {
        return (
            <div className="w-100 bg-primary text-white p-3 clearfix">
                <button className="btn btn-secondary" onclick={this.props.openProductsList}>
                    Products
                </button>
                <h5 className="float-end mb-0">
                    Total: ${this.props.orderTotalValue}
                    <button className="btn btn-success ms-3" onclick={this.props.openCartDetails}>
                        Open cart
                    </button>
                </h5>
            </div>
        )
    }

}