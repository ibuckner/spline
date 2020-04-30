type TMargin = {
	bottom: number,
	left: number,
	right: number,
	top: number
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

	const svg = document.createElementNS(NS.svg, "svg");
	svg.setAttributeNS(null, "x", "0");
	svg.setAttributeNS(null, "y", "0");
	svg.setAttributeNS(null, "height", "100%");
	svg.setAttributeNS(null, "width", "100%");
	svg.setAttributeNS(null, "viewBox", `0 0 ${options.width} ${options.height}`);
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
	measure,
	svg,
	TMargin,
	TSVGGenerator
};
