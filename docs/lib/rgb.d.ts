export declare type TRGB = [number, number, number];
export declare class RGB {
    static readonly brightnessThreshold: number;
    static readonly CSS: {
        [key: string]: number;
    };
    static readonly differenceThreshold: number;
    /**
     * @description https://www.w3.org/TR/AERT/#color-contrast
     */
    get brightness(): number;
    r: number;
    g: number;
    b: number;
    constructor(value: string);
    /**
     * Returns color difference between two RGB values
     * @description https://www.w3.org/TR/AERT/#color-contrast
     * @param compare - color to compare against
     */
    colorDifference(compare: RGB): number;
    /**
     * Returns CSS color name if available
     */
    toCSSString(): string | unknown;
    /**
     * Returns RRGGBB value
     */
    toHex(): string;
    /**
     * Returns #RRGGBB value
     */
    toString(): string;
    private _rshift;
    private _gshift;
    private _bshift;
    private _hex;
    private _n;
}
