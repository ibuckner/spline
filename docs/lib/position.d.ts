export declare type TOrientX = "left" | "center" | "right";
export declare type TOrientY = "top" | "middle" | "bottom";
export declare type TPosition = {
    orientX: TOrientX;
    orientY: TOrientY;
    x: number;
    y: number;
};
/**
 * Returns the x,y pair measurement
 * @param referenceElement - element to position targetElement by
 * @param targetElement - element that will receive position values
 * @param padding - (optional) additional padding to account for
 */
export declare function positionPop(referenceElement: HTMLElement | SVGElement, targetElement: HTMLElement | SVGElement, padding?: number): TPosition;
