export type TOrientX = "left" | "center" | "right";

export type TOrientY = "top" | "middle" | "bottom";

export type TPosition = {
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
export function positionPop(referenceElement: HTMLElement | SVGElement, targetElement: HTMLElement | SVGElement, padding: number = 0): TPosition {
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