import Interactable from "./Interactable";


export default class Clickable extends Interactable {

	constructor(x: number, y: number) {
		super(x, y);
	}

	clickEventListeners: Function[] = [];

	onClick(e: Event): void {
		super.onInteract();

		for(let el of this.clickEventListeners) {
			el.call(this, e);
		}
	}

	onRightClick(e: Event): void {

	}

	addClickEventListener(f: Function): number {
		return this.clickEventListeners.push(f);
	}

}