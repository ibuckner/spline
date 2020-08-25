import { select, selectAll } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { schemePaired } from "d3-scale-chromatic";
import { svg, TMargin } from ".";

export class Basechart {
  public canvas: any;
  public container: HTMLElement = document.querySelector("body") as HTMLElement;
  public h: number = 200;
  public id: string = "basechart";
  public locale: string = "en-GB";
  public margin: TMargin = { bottom: 20, left: 20, right: 30, top: 20 };
  public rh: number = 160;
  public rw: number = 150;
  public scale: any = {};
  public w: number = 200;

  constructor(options: any) {
    if (options.margin !== undefined) {
      let m = options.margin;
      m.left = isNaN(m.left) ? 0 : m.left;
      m.right = isNaN(m.right) ? 0 : m.right;
      m.top = isNaN(m.top) ? 0 : m.top;
      m.bottom = isNaN(m.bottom) ? 0 : m.bottom;
      this.margin = m;
    }

    if (options.locale !== undefined) {
      this.locale = options.locale;
    }

    if (options.container !== undefined) {
      this.container = options.container;
    }

    const box: DOMRect = this.container.getBoundingClientRect();
    this.h = box.height;
    this.w = box.width;
    this.rh = this.h - this.margin.top - this.margin.bottom;
    this.rw = this.w - this.margin.left - this.margin.right;

    this.scale.color = scaleOrdinal(schemePaired);
    this.scale.x = (x: any) => x;
    this.scale.y = (y: any) => y;
  }

  /**
   * Clears selection from chart
   */
  public clearSelection(): Basechart {
    selectAll(".selected").classed("selected", false);
    selectAll(".fade").classed("fade", false);
    return this;
  }

  /**
   * Removes this chart from the DOM
   */
  public destroy(): Basechart {
    select(this.container).select("svg").remove();
    return this;
  }

  public draw(): Basechart {
    this._drawCanvas();
    return this;
  }

  private _drawCanvas(): Basechart {
    if (select(this.container).select("svg").empty()) {
      let sg: SVGElement | null = svg(this.container, {
        height: this.h,
        margin: this.margin,
        width: this.w
      }) as SVGElement;

      const s = select(sg)
        .on("click", () => this.clearSelection());

      this.canvas = s.select(".canvas");
    }
    return this;
  }
}