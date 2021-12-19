import Interactable from "./Interactable";

export default class Hoverable extends Interactable {
	
	constructor(x: number, y: number, width?: number, height?: number) {
		super(x, y, width, height);
	}

	hoverEventListeners: Function[] = [];

	onHover(e: Event): void {
		for(let el of this.hoverEventListeners) {
			el.call(this, e);
		}
	}

	onHoverLeave(e: Event): void {

	}

	addHoverEventListener(f: Function): number {
		return this.hoverEventListeners.push(f);
	}

}