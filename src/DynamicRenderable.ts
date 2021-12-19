import Clickable from "./Clickable";
import Color from "./Color";
import Hoverable from "./Hoverable";
import Interactable from "./Interactable";
import Selectable from "./Selectable";

export default class DynamicRenderable extends Interactable implements Clickable, Hoverable, Selectable {
	
	selectedColor?: Color;
	hoverableColor?: Color;
	baseColor: Color = this.color;
	hovered: boolean = false;
	selected: boolean = false;

	clickEventListeners: Function[] = [];
	hoverEventListeners: Function[] = [];
	selectEventListeners: Function[] = [];
	
	onSelect(e: Event): void {
		if(this.selected) return;

		for(let el of this.selectEventListeners) {
			el.call(this, e);
		}
		
		super.onInteract();
		this.selected = true;
		if(!this.hovered)
			this.baseColor = this.color;
		this.color = this.selectedColor ? this.selectedColor : this.color;
	}

	onDeselect(e: Event): void {
		super.onInteractStop();
		this.selected = false;
		this.color = this.baseColor;
	}

	onHover(e: Event): void {
		if(this.hovered || this.selected) return;

		for(let el of this.hoverEventListeners) {
			el.call(this, e);
		}

		this.hovered = true;
		this.baseColor = this.color;
		this.color = this.hoverableColor ? this.hoverableColor : this.color;
	}

	onHoverLeave(e: Event): void {
		if(this.selected) return;
		this.hovered = false;
		this.color = this.baseColor;
	}

	onClick(e: Event): void {
		super.onInteract();

		for(let el of this.clickEventListeners) {
			el.call(this, e);
		}

		this.onSelect(((null as any) as Event));
	}

	onRightClick(e: Event): void {
	}

	addClickEventListener(f: Function): number {
		return this.clickEventListeners.push(f);
	}

	addHoverEventListener(f: Function): number {
		return this.hoverEventListeners.push(f);
	}

	addSelectEventListener(f: Function): number {
		return this.selectEventListeners.push(f);
	}
}