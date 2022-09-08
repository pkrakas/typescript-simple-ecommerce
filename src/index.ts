import { RemoteDataSource } from "./data/remoteDataSource"
import { HtmlDisplay } from "./htmlDisplay"
import "./index.css"

const remoteDataSource = new RemoteDataSource()

async function displayData(): Promise<HTMLElement> {
    const content = document.createElement('div')
    const htmlDisplay = new HtmlDisplay()
    htmlDisplay.props = {
        dataSource: remoteDataSource
    }
    content.appendChild(await htmlDisplay.getContent())
    return content
}

document.onreadystatechange = async () => {
    if(document.readyState === 'complete') {
        const rootElement = document.getElementById('app')
        rootElement.innerHTML = ""
        rootElement.appendChild(await displayData())
    }
}