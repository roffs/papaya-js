export type Element = {
    type: ElementType,
    props: Props,
}

export enum ElementType {
    TEXT = 'text',
    DIV = 'div',
    A = 'a',
    B = 'b'
}

export type Props = {
    children: Element[],
    [key: string]: any
}
