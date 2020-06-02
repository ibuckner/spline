import { format } from "d3-format";
import { ResizeObserver } from '@juggle/resize-observer';

type TMargin = {
	bottom: number,
	left: number,
	right: number,
	top: number
};

type TOrientX = "left" | "center" | "right";

type TOrientY = "top" | "middle" | "bottom";

type TPoint = {
	x: number,
	y: number
};

type TPosition = {
	orientX: TOrientX;
	orientY: TOrientY;
	x: number;
	y: number;
};

type TSVGGenerator = {
	height?: number,
	margin?: TMargin
	width?: number
};

const NS = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

const format2 = format(",.2f"), format1 = format(",.1f"), format0 = format(",.0f");
/**
 * Convenience wrapper for D3-format
 * @example - formatNumber(1234) -> 1,234
 * @param v - number to convert to number string
 */
function formatNumber(v: number): string {
	return v < 1 ? format2(v) : v < 10 ? format1(v) : format0(v);
}

/**
 * Measure the content area minus the padding and border
 * @param container - DOM element to measure
 * @returns - DOMRect
 */
function measure(container: HTMLElement): DOMRect {
	let result: DOMRect = container.getBoundingClientRect();
	const s = window.getComputedStyle(container);
	let ph = parseFloat(s.paddingTop) + parseFloat(s.paddingBottom);
	let pw = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight);
	let bh = parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth);
	let bw = parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth);
	result.width = result.width - pw - bw;
	result.height = result.height - ph - bh;
	return result;
}

/**
 * Returns the x,y pair measurement
 * @param referenceElement - element to position targetElement by
 * @param targetElement - element that will receive position values
 * @param padding - (optional) additional padding to account for
 */
function positionPop(referenceElement: SVGElement, targetElement: HTMLElement | SVGElement, padding: number = 0): TPosition {
	const rb: DOMRect = referenceElement.getBoundingClientRect();
	const tb: DOMRect = targetElement.getBoundingClientRect();
	const ch: number = document.documentElement.clientHeight;
	const cw: number = document.documentElement.clientWidth;
	let x: number = rb.right + padding, y: number = rb.top + (rb.height / 2) - (tb.height / 2);
	let h: TOrientX = "right", v: TOrientY = "middle";

	if (y + (tb.height / 2) + padding > ch) {
		v = "top";
		y = rb.top - padding - tb.height;
	}
	
	if (y < 0) {
		v = "bottom";
		y = rb.bottom + padding;
	}

	if (x + tb.width > cw) {
		h = "left";
		x = rb.left - padding - tb.width;
	}
	
	if (x < 0) {
		h = "center";
		x = rb.left + (rb.width / 2);
	}

	return { orientX: h, orientY: v, x: x, y: y };
}

/**
 * Creates SVG element for use with D3 visualisations
 * @param container - parent DOM element to append SVG to
 * @param options - string to select from
 */
function svg(container: HTMLElement, options?: TSVGGenerator): Partial<SVGElement> {
	if (options === undefined) {
		options = {};
	}

	if (options.height === undefined || options.width === undefined) {
		const bbox: DOMRect = measure(container);
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

	const ro = new ResizeObserver((entries, observer) => {
		const entry = entries[0];
		const { inlineSize: w, blockSize: h } = entry.contentBoxSize[0];
		if (options) {
			options.height = h;
			options.width = w;
		}
		svg.setAttributeNS(null, "height", `${h}`);
		svg.setAttributeNS(null, "width", `${w}`);
	});

	ro.observe(container, { box: "content-box" });

	const svg = document.createElementNS(NS.svg, "svg");
	svg.setAttributeNS(null, "x", "0");
	svg.setAttributeNS(null, "y", "0");
	svg.setAttributeNS(null, "height", `100%`);
	svg.setAttributeNS(null, "width", `100%`);
	svg.setAttributeNS(null, "viewBox", `0 0 ${options.width} ${options.height}`);
	svg.setAttributeNS(null, "preserveAspectRatio", "xMinYMin meet");
	svg.setAttributeNS(NS.xmlns, "xmlns", NS.svg);
	container.appendChild(svg);

	const defs = document.createElementNS(NS.svg, "defs");
	svg.appendChild(defs);

	const canvas = document.createElementNS(NS.svg, "g");
	canvas.setAttributeNS(null, "class", "canvas");
	canvas.setAttributeNS(null, "transform", `translate(${options.margin.left},${options.margin.top})`);
	svg.appendChild(canvas);

	return svg;
}

export {
	formatNumber,
	measure,
	positionPop,
	svg,

	TMargin,
	TOrientX,
	TOrientY,
	TPoint,
	TPosition,
	TSVGGenerator
};
