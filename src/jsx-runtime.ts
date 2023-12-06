// /// <reference lib="dom" />
// /// <reference lib="dom.iterable" />

// import { Element, ElementType, Props } from "./types";


// export function jsxDEV(type: ElementType, props?: Props | null): Element {

//     console.log("Type", type)
//     console.log("Props", props)
//     console.log("Children", props?.children)

//     // const temp_children: Element[] = props?.children !== undefined
//     //     ? [].concat(props.children)
//     //     : []

//     return {
//         type,
//         props: {
//             ...props,
//             // children: temp_children.map(child => jsxDEV(child.type, child.props))
//             children: typeof props?.children === 'string'
//                 ? [createTextElement(props?.children)]
//                 : props?.children
//         }
//     }
// }


// function createTextElement(text: string): Element {
//     const textElement: Element = {
//         type: ElementType.TEXT,
//         props: {
//             "nodeValue": text,
//             children: [],
//         },
//     }
//     return textElement;
// }