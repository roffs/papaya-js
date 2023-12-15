/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Element, ElementType, Fiber, Nullable } from "./types";

function createDomElement(fiber: Fiber): HTMLElement {
  const dom = document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter((key) => key !== "children")
    .forEach((key) => {
      key == "nodeValue"
        ? (dom.textContent = fiber.props[key])
        : dom.setAttribute(key, fiber.props[key]);
    });

  return dom;
}

let nextUnitOfWork: Nullable<Fiber> = null;
let wipRoot: Nullable<Fiber> = null;

function commitRoot() {
  commitWork(wipRoot!.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber: Fiber): Nullable<Fiber> {
  if (!fiber.dom) {
    fiber.dom = createDomElement(fiber);
  }

  const elements = fiber.props.children;

  let prevSibling: Fiber;

  elements
    .map((element) => ({
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }))
    .forEach((newFiber: Fiber, index) => {
      index === 0 ? (fiber.child = newFiber) : (prevSibling.sibling = newFiber);
      prevSibling = newFiber;
    });

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent!;
  }

  return null;
}

function render(element: Element, container: HTMLElement) {
  wipRoot = {
    type: ElementType.A,
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}

const element: Element = (
  <div id="foo">
    <a>bar </a>
    <b>test!</b>
  </div>
);

const container = document.getElementById("root")!;
render(element, container);
