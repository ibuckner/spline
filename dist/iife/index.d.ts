declare type TMargin = {
    bottom: number;
    left: number;
    right: number;
    top: number;
};
declare type TSVGGenerator = {
    height?: number;
    margin?: TMargin;
    width?: number;
};
/**
 * Measure the content area minus the padding and border
 * @param container - DOM element to measure
 * @returns - DOMRect
 */
declare function measure(container: HTMLElement): DOMRect;
/**
 * Creates SVG element for use with D3 visualisations
 * @param container - parent DOM element to append SVG to
 * @param options - string to select from
 */
declare function svg(container: HTMLElement, options?: TSVGGenerator): Partial<SVGElement>;
declare function formatNumber(v: number): string;
export { formatNumber, measure, svg, TMargin, TSVGGenerator };
