export declare type TMargin = {
    bottom: number;
    left: number;
    right: number;
    top: number;
};
export declare type TSVGGenerator = {
    class?: string;
    height?: number;
    id?: string;
    margin?: TMargin;
    width?: number;
};
/**
 * Creates SVG element for use with D3 visualisations
 * @param container - parent DOM element to append SVG to
 * @param options - string to select from
 */
export declare function svg(container: HTMLElement, options?: TSVGGenerator): Partial<SVGElement>;
