# spline

A small collection of D3 related functions

```javascript
measure(element);
// returns a DOMRect (see element.getBoundingClientRect())
// minus the padding and border dimensions on height and width

svg(element, { margin: { left: 23, top: 18 }});
// returns the SVGElement attached to the (parent) element
// assumes measure(element) if size not provided via the options parameter
```

## Install

```shell
npm i --save @buckneri/spline
```
