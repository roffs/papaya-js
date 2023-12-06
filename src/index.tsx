/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { ElementType, Props, Element } from "./types";

console.log("Hello via Bun!");



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

function createElement(type: ElementType, props?: Props | null, ...children: Element[]): Element {

    console.log("Type", type)
    console.log("Props", props)
    console.log("Children", children)

    return {
        type,
        props: {
            ...props,
            children: children.map(child => (
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            ))
        }
    }
}


function createTextElement(text: string): Element {
    const textElement: Element = {
        type: ElementType.TEXT,
        props: {
            "nodeValue": text,
            children: [],
        },
    }
    return textElement;
}

const Papaya = {
    createElement
}
/** @jsx Papaya.createElement */
const element: Element = (
    <div id="foo" >
        <a>bar </a>
        < b />
    </div>
)

console.log('element', element)


const container = document.getElementById("root")!

render(element, container);

console.log("container", container)