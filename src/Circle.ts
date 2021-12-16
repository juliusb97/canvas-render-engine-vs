import Color from "./Color";
import Renderable from "./Renderable";
import RenderEngine from "./RenderEngine";

export default class Circle extends Renderable {

	constructor(x: number, y: number, radius: number, stroke?: boolean, fill?: boolean, color?: Color, strokeStyle?: string) {
		super(x, y);
		this.radius = radius;

		this.color = color ? color : Color.Black;
		this.fill = (fill === undefined || fill === null) ? true : fill;
		this.stroke = (stroke === undefined || stroke === null) ? true : stroke;
		this.strokeStyle = strokeStyle ? strokeStyle : "1px solid black";
	}

	radius: number;
	color: Color;
	stroke: boolean;
	fill: boolean;
	strokeStyle: string;

	render(renderEngine: RenderEngine): void {

		if(this.stroke)
			renderEngine.cx.beginPath();

		renderEngine.cx.fillStyle = this.color.toCanvasColor();
		renderEngine.cx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		
		if(this.fill)
			renderEngine.cx.fill();

		if(this.stroke)
			renderEngine.cx.stroke();
	}

}