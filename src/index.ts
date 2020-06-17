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
	class?: string,
	height?: number,
	id?: string,
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

/**
 * Returns the x,y pair measurement
 * @param referenceElement - element to position targetElement by
 * @param targetElement - element that will receive position values
 * @param padding - (optional) additional padding to account for
 */
function positionPop(referenceElement: HTMLElement | SVGElement, targetElement: HTMLElement | SVGElement, padding: number = 0): TPosition {
	const rb: DOMRect = referenceElement.getBoundingClientRect();
	const tb: DOMRect = targetElement.getBoundingClientRect();
	const ch: number = document.documentElement.clientHeight;
	const cw: number = document.documentElement.clientWidth;
	let x: number = (rb.right + window.scrollX) + padding;
	let y: number = (rb.top + window.scrollY) - (tb.height / 2 - rb.height / 2);
	let h: TOrientX = "right";
	let v: TOrientY = "middle";

	if (y + tb.height - window.scrollY > ch) {
		v = "top";
		y = rb.top + window.scrollY - padding - tb.height;
	}
	
	if (y < window.scrollY) {
		v = "bottom";
		y = (rb.bottom + window.scrollY) + padding;
	}

	if (x + tb.width - window.scrollX > cw) {
		h = "left";
		x = (rb.left + window.scrollX) - padding - tb.width;
	}
	
	if (x < window.scrollX) {
		h = "center";
		x = (rb.left + window.scrollX) + (rb.width / 2);
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
		const bbox: DOMRect = container.getBoundingClientRect();
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
	if (options.id) {
		svg.setAttributeNS(null, "id", options.id);
	}
	if (options.class) {
		svg.setAttributeNS(null, "class", options.class);
	}
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
	positionPop,
	svg,

	TMargin,
	TOrientX,
	TOrientY,
	TPoint,
	TPosition,
	TSVGGenerator
};
