import DynamicRenderable from "./DynamicRenderable";

export default class Movable extends DynamicRenderable {

	cursorOffsetX: number = 0;
	cursorOffsetY: number = 0;

	move(x: number, y: number): void {
		this.x = x + this.cursorOffsetX;
		this.y = y + this.cursorOffsetY;
	}

	override onClick(e: Event): void {
		super.onClick(e);
		this.cursorOffsetX = this.x - (e as any).layerX;
		this.cursorOffsetY = this.y - (e as any).layerY;
	}

	onMove(x: number, y: number): void {
		this.move(x, y);
	}

	onMoveStop(): void {

	}
	
}