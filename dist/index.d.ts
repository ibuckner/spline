declare type TMargin = {
    bottom: number;
    left: number;
    right: number;
    top: number;
};
declare type TOrientX = "left" | "center" | "right";
declare type TOrientY = "top" | "middle" | "bottom";
declare type TPoint = {
    x: number;
    y: number;
};
declare type TPosition = {
    orientX: TOrientX;
    orientY: TOrientY;
    x: number;
    y: number;
};
declare type TSVGGenerator = {
    class?: string;
    height?: number;
    id?: string;
    margin?: TMargin;
    width?: number;
};
/**
 * Returns the x,y pair measurement
 * @param referenceElement - element to position targetElement by
 * @param targetElement - element that will receive position values
 * @param padding - (optional) additional padding to account for
 */
declare function positionPop(referenceElement: HTMLElement | SVGElement, targetElement: HTMLElement | SVGElement, padding?: number): TPosition;
/**
 * Creates SVG element for use with D3 visualisations
 * @param container - parent DOM element to append SVG to
 * @param options - string to select from
 */
declare function svg(container: HTMLElement, options?: TSVGGenerator): Partial<SVGElement>;
export { positionPop, svg, TMargin, TOrientX, TOrientY, TPoint, TPosition, TSVGGenerator };
