import RenderEngine from "./RenderEngine";
import Color from "./Color";
import Renderable from "./Renderable";
import RenderContext from "./RenderContext";

export default class Rectangle extends Renderable {

	constructor(x: number, y: number, width: number, height: number, fill?: boolean, stroke?: boolean, color?: Color, strokeStyle?: string) {
		super(x, y);
		this.width = width;
		this.height = height;

		this.color = color ? color : Color.Black;

		this.stroke = (stroke == undefined || stroke == null) ? true : stroke;
		this.fill = (fill == undefined || fill == null) ? true : fill;
		this.strokeStyle = strokeStyle ? strokeStyle : "1px solid black";
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