import { select } from "d3-selection";
/**
 * Creates a barebones SVG object and returns the d3 selection
 * @param container - parent DOM container for SVG selection
 * @param options - string to select from
 */
function svg(container, options) {
    const parent = select(container);
    if (options === undefined) {
        options = {};
    }
    if (options.height === undefined || options.width === undefined) {
        const bbox = parent.node().getBoundingClientRect();
        options.height = bbox.height;
        options.width = bbox.width;
    }
    if (options.margin === undefined) {
        options.margin = { bottom: 10, left: 10, right: 10, top: 10 };
    }
    if (options.margin.top === undefined) {
        options.margin.top = 10;
    }
    if (options.margin.left === undefined) {
        options.margin.left = 10;
    }
    const svg = parent.append("svg")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("viewBox", `0 0 ${options.width} ${options.height}`)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
    const defs = svg.append("defs");
    const clip = defs.append("clipPath")
        .attr("clipPathUnits", "userSpaceOnUse")
        .attr("id", "clipcanvas");
    clip.append("rect")
        .attr("height", options.height)
        .attr("width", options.width)
        .attr("x", 0)
        .attr("y", 0);
    svg.append("g")
        .attr("class", "canvas")
        .attr("transform", `translate(${options.margin.left},${options.margin.top})`)
        .attr("clip-path", `url(#clipcanvas)`);
    return svg;
}
export { svg };
