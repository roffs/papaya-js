/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Element, ElementType, Props } from "./types";

export function jsxDEV(type: ElementType, props?: Props | null): Element {
  return {
    type,
    props: {
      ...props,
      children:
        typeof props?.children === "string"
          ? [createTextElement(props?.children)]
          : props!.children,
    },
  };
}

function createTextElement(text: string): Element {
  const textElement: Element = {
    type: ElementType.TEXT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
  return textElement;
}
