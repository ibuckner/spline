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
 * Creates a barebones SVG object and returns the d3 selection
 * @param container - parent DOM container for SVG selection
 * @param options - string to select from
 */
export declare function svg(container: HTMLElement | string, options?: TSVGGenerator): any;
export {};
