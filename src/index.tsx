/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Element } from "./types";


function render(element: Element, container: Node) {
    const dom = document.createElement(element.type);

    Object.keys(element.props)
        .filter(key => key !== "children")
        .forEach(key => {
            key == 'nodeValue'
                ? dom.textContent = element.props[key]
                : dom.setAttribute(key, element.props[key])

        })

    element.props?.children?.forEach(child =>
        render(child, dom)
    )

    container.appendChild(dom)
}

const element: Element = (
    <div id="foo" >
        <a>bar </a>
        < b />
    </div>
)

const container = document.getElementById("root")!
render(element, container);
