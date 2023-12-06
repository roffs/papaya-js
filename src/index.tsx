/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Element, ElementType, Props } from "./types";


function createDomElement(fiber: Fiber): HTMLElement {
    const dom = document.createElement(fiber.type);

    Object.keys(fiber.props)
        .filter(key => key !== "children")
        .forEach(key => {
            key == 'nodeValue'
                ? dom.textContent = fiber.props[key]
                : dom.setAttribute(key, fiber.props[key])

        })

    // ????
    // fiber.props.children?.forEach(child =>
    //     render(child, dom)
    // )

    return dom;
}

let nextUnitOfWork: Nullable<Fiber> = null
let wipRoot: Nullable<Fiber> = null



const element: Element = (
    <div id="foo" >
        <a>bar </a>
        < b />
    </div>
)

type Nullable<T> = T | null;

type Fiber = {
    type: ElementType,
    props: Props,
    parent?: Fiber,
    sibling?: Fiber,
    child?: Fiber,
    dom: Nullable<HTMLElement>,
}

function commitRoot() {
    commitWork(wipRoot!.child)
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const domParent = fiber.parent.dom
    domParent.appendChild(fiber.dom)
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)


function performUnitOfWork(fiber: Fiber): Nullable<Fiber> {
    if (!fiber.dom) {
        fiber.dom = createDomElement(fiber)
    }

    const elements = fiber.props.children

    let prevSibling: Fiber;
    elements.map(element => ({
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: null,
    })).forEach((newFiber: Fiber, index) => {
        prevSibling = newFiber // Va aqui o a sota? 
        index === 0
            ? fiber.child = newFiber
            : prevSibling.sibling = newFiber
    })


    if (fiber.child) {
        return fiber.child
    }

    let nextFiber: Fiber = fiber

    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent!
    }

    return null;
}

function render(element: Element, container: HTMLElement) {
    wipRoot = {
        type: element.type,
        dom: container,
        props: {
            children: [element],
        },
    }
    nextUnitOfWork = wipRoot;
}

const container = document.getElementById("root")!
render(element, container);
