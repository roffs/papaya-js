export type Element = {
  type: ElementType;
  props: Props;
};

export enum ElementType {
  TEXT = "text",
  DIV = "div",
  A = "a",
  B = "b",
}

export type Props = {
  children: Element[];
  [key: string]: any;
};

export type Nullable<T> = T | null;

export type Fiber = {
  type: ElementType;
  props: Props;
  parent?: Fiber;
  sibling?: Fiber;
  child?: Fiber;
  dom: Nullable<HTMLElement>;
};
