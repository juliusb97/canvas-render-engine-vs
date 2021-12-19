import Renderable from "./Renderable";
import RenderEngine from "./RenderEngine";

export default class Interactable extends Renderable {

	constructor(x: number, y: number, width?: number, height?: number) {
		super(x, y);

		this.width = width ? width : 0;
		this.height = height ? height : 0;
		this.interaction = false;
		this.oldLayer = 0;
	}

	width: number;
	height: number;
	interaction: boolean;
	oldLayer: number;

	isPointInside(x: number, y: number) {
		if(this.x < x && x < this.x+this.width) {
			if(this.y < y && y < this.y+this.height) {
				return true;
			}
		}
		return false;
	}

	onInteract(): void {
		
		this.oldLayer = this.layer;
		this.layer = (RenderEngine.layers.get("interact") as number);

		this.interaction = true;
	}

	onInteractStop(): void {
		this.interaction = false;
		this.layer = this.oldLayer;
	}

}