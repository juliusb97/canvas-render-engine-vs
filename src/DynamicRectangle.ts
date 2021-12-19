import Color from "./Color";
import DynamicRenderable from "./DynamicRenderable";
import Movable from "./Movable";
import Rectangle from "./Rectangle";
import RenderEngine from "./RenderEngine";

export default class DynamicRectangle extends Movable implements Rectangle {

	constructor(x: number, y: number, width: number, height: number, fill?: boolean, stroke?: boolean, color?: Color, strokeStyle?: string) {
		super(x, y, width, height);
		this.width = width;
		this.height = height;

		this.color = color ? color : Color.Black;

		this.stroke = (stroke == undefined || stroke == null) ? true : stroke;
		this.fill = (fill == undefined || fill == null) ? true : fill;
		this.strokeStyle = strokeStyle ? strokeStyle : "1px solid black";
	}

	isPointInside(x: number, y: number) {
		if(this.x < x && x < this.x+this.width) {
			if(this.y < y && y < this.y+this.height) {
				return true;
			}
		}
		return false;
	}

	width: number;
	height: number;
	color: Color;
	fill: boolean;
	stroke: boolean;
	strokeStyle: string;

	render(renderEngine: RenderEngine): void {
		renderEngine.cx.fillStyle = this.color.toCanvasColor();
		renderEngine.cx.fillRect(this.x, this.y, this.width, this.height);
	}
	
}