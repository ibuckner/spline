import { TMargin } from ".";
export declare class Basechart {
    canvas: any;
    container: HTMLElement;
    h: number;
    id: string;
    locale: string;
    margin: TMargin;
    rh: number;
    rw: number;
    scale: any;
    w: number;
    constructor(options: any);
    /**
     * Clears selection from chart
     */
    clearSelection(): void;
    /**
     * Removes this chart from the DOM
     */
    destroy(): Basechart;
    draw(): Basechart;
}
