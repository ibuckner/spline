import { ResizeObserver } from '@juggle/resize-observer';

export type TMargin = {
	bottom: number,
	left: number,
	right: number,
	top: number
};

export type TSVGGenerator = {
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
 * Creates SVG element for use with D3 visualisations
 * @param container - parent DOM element to append SVG to
 * @param options - string to select from
 */
export function svg(container: HTMLElement, options?: TSVGGenerator): Partial<SVGElement> {
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