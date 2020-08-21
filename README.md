# spline

A small collection of D3 related functions

```javascript
formatNumber(number);
// returns a formated string number

positionPop(referenceElement, targetElement, 20);
/**
 * returns information for the targetElement to be positioned
 * relative to the referenceElement
 * > {
 *      orientX: "left" | "center" | "right",
 *      orientY: "top" | "middle" | "bottom",
 *      x: number, y: number
 *   }
 */

new RGB (*CSS_color*);

svg(element, { margin: { left: 23, top: 18 }});
// returns the SVGElement attached to the (parent) element
```

## Install

```shell
npm i --save @buckneri/spline
```
