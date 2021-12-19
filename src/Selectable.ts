import Interactable from "./Interactable";

export default class Selectable extends Interactable {

	constructor(x: number, y: number, width?: number, height?: number) {
		super(x, y, width, height);
	}

	selectEventListeners: Function[] = [];
	
	onSelect(e: Event): void {
		super.onInteract();

		for(let el of this.selectEventListeners) {
			el.call(this, e);
		}
	}

	onDeselect(e: Event): void {
		super.onInteractStop();
	}

	addSelectEventListener(f: Function): number {
		return this.selectEventListeners.push(f);
	}
}