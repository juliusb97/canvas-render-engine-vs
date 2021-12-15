import { RGB, HSV, HEX } from "./ColorTypes";

export default class Color {

	constructor(color: RGB | HSV | HEX) {

		this.color = {
			r: 0,
			g: 0,
			b: 0
		};

		if(Object.prototype.hasOwnProperty.call(color, "h")) {
			this.color = { r: 0, g: 0, b: 0} as RGB; //TODO implement correctly
		} else if(Object.prototype.hasOwnProperty.call(color, "r") && typeof (color as HEX).r == "string") {
			this.color.r = parseInt((color as HEX).r, 16);
			this.color.g = parseInt((color as HEX).g, 16);
			this.color.b = parseInt((color as HEX).b, 16);
		} else if(Object.prototype.hasOwnProperty.call(color, "r")) {
			this.color = color as RGB;
		}

		// if(!Color.validate(this.color))
		// 	throw "Color invalid.";
	}

	color: RGB;

	static black = new Color({ r: 0, g: 0, b: 0} as RGB);
	static white = new Color({ r: 255, g: 255, b: 255} as RGB);
	static red = new Color({ r: 255, g: 0, b: 0} as RGB);
	static green = new Color({ r: 0, g: 255, b: 0} as RGB);
	static blue = new Color({ r: 0, g: 0, b: 255} as RGB);

	toCanvasColor(): string {
		return `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
	}

	static validate(color: RGB | HSV | HEX): boolean {
		if(Object.prototype.hasOwnProperty.call(color, "h")) {
			return (
				(color as RGB).r >= 0 && (color as RGB).r <= 255 &&
				(color as RGB).g >= 0 && (color as RGB).g <= 255 &&
				(color as RGB).b >= 0 && (color as RGB).b <= 255
			);
		} else if(Object.prototype.hasOwnProperty.call(color, "r") && typeof (color as HEX).r == "string") {
				let r = parseInt((color as HEX).r, 16);
				let g = parseInt((color as HEX).g, 16);
				let b = parseInt((color as HEX).b, 16);

				return (
					r >= 0 && r <= 255 &&
					g >= 0 && g <= 255 &&
					b >= 0 && b <= 255
				);
		} else if(Object.prototype.hasOwnProperty.call(color, "r")) {
			return false; //TODO implement
		}

		return false;
	}

}