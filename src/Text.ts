import Color from "./Color";
import Renderable from "./Renderable";
import RenderEngine from "./RenderEngine";

export default class Text extends Renderable {

	constructor(x: number, y: number, text: string, font?: string, fontSize?: number, fill?: boolean, stroke?: boolean, color?: Color, strokeStyle?: string) {
		super(x, y);
		this.text = text ? text : "";
		this.font = font ? font : "monospace";
		this.fontSize = fontSize ? fontSize : 12;

		this.color = color ? color : Color.black;
		this.fill = (fill === undefined || fill === null) ? true : fill;
		this.stroke = (stroke === undefined || stroke === null) ? true : stroke;
		this.strokeStyle = strokeStyle ? strokeStyle : "1px solid black";

		this.lineHeight = 1;
	}

	color: Color;
	text: string;
	fill: boolean;
	stroke: boolean;
	strokeStyle: string;
	font: string;
	fontSize: number;
	lineHeight: number;
	hAlign: "left" | "center";

	render(renderEngine: RenderEngine): void {
		if(this.stroke)
			renderEngine.cx.beginPath();

		let lineCounter = 0;
		for(let line of this.text.split("\n")) {
			renderEngine.cx.fillStyle = this.color.toCanvasColor();
			renderEngine.cx.font = `${this.fontSize}px ${this.font}`;

			if(this.hAlign == "left") {
				renderEngine.cx.fillText(line, this.x, this.y + this.lineHeight * this.fontSize * lineCounter);
			} else {
				const textMeasurment = renderEngine.cx.measureText(line);

				renderEngine.cx.fillText(line, this.x - textMeasurment.width / 2, this.y + this.lineHeight * this.fontSize * lineCounter);
			}
			
			lineCounter++;
		}

		if(this.fill)
			renderEngine.cx.fill();

		if(this.stroke)
			renderEngine.cx.stroke();
	}

	align(alignment: "left" | "center") {
		this.hAlign = alignment;
	}

}