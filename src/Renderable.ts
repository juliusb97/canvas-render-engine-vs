import RenderEngine from "./RenderEngine";
import RenderContext from "./RenderContext";

export default class Renderable {

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.children = [];
		this.layer = 0;
	}

	x: number;
	y: number;
	children: Renderable[];
	layer: number;

	public Render(): RenderContext[] {

		const childCalls: RenderContext[] = [];
		if(this.children.length) {
			for(let child of this.children) {
				child.x = this.x;
				child.y = this.y;

				let renderCalls = child.Render();
				for(let call of renderCalls) {
					call.layer = (call.layer > this.layer) ? call.layer : (this.layer + 1);
				}

				childCalls.push(...renderCalls);
			}
		}

		return [...childCalls, {
			layer: this.layer,
			context: this,
			calls: [this.render]
		}];
	}

	render(renderEngine: RenderEngine): void {
		
	}

	addChild(child: Renderable): void {
		this.children.push(child);
	}

	removeChild(child: Renderable): void {
		this.children.splice(this.children.findIndex(aChild => aChild == child), 1);
	}

}