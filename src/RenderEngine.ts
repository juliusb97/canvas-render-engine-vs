import Renderable from "./Renderable";
import RenderContext from "./RenderContext";

export default class RenderEngine {

	constructor(canvas: HTMLCanvasElement) {

		this.time = 0;

		this.cv = canvas;
		this.cx = (canvas.getContext("2d") as CanvasRenderingContext2D);

		this.calculateDimensions();

		this.lazy = true;

		this.fillFunction = () => {
			this.cx.fillStyle = this.fillColor;
			this.cx.fillRect(0, 0, this.cvDimensions.width, this.cvDimensions.height);
		}
	}

	cv: HTMLCanvasElement;
	public cx: CanvasRenderingContext2D;
	cvDimensions = { width: 0, height: 0};
	lazy: boolean;

	renderables: Renderable[] = [];
	fillFunction: Function;
	fillColor = "#222";
	time: number;

	callbacks: Callback[] = [{ id: "default", context: this, args: [], callback: () => {}}];

	private calculateDimensions() {

		let canvasDimensions = this.cv.getBoundingClientRect();
		this.cv.setAttribute("width", canvasDimensions.width.toString());
		this.cv.setAttribute("height", canvasDimensions.height.toString());

		this.cvDimensions.width = canvasDimensions.width;
		this.cvDimensions.height = canvasDimensions.height;
	}

	Render(): void {
		this.calculateDimensions();

		this.fillFunction();

		this.callbacks.forEach(callback => {
			callback.callback.call(callback.context, ...callback.args)
		});
		
		let renderCalls: RenderContext[] = [];
		for(let renderable of this.renderables) {
			renderCalls.push(...renderable.Render());
		}

		let sortedRenderables = renderCalls.sort((rctxA: RenderContext, rctxB: RenderContext) => rctxA.layer - rctxB.layer);

		for(let rctx of sortedRenderables) {
			for(let call of rctx.calls) {
				call.call(rctx.context, this);
			}
		}

		if(!this.lazy)
			requestAnimationFrame(this.Render.bind(this));
		this.time++;
	}

	addRenderable(renderable: Renderable): void {
		this.renderables.push(renderable);
	}

	addCallback(callback: Callback): void {
		if(this.callbacks.find(existingCallback => existingCallback.id === callback.id)) 
			throw `Callback id: ${callback.id} already exists!`;
			
		this.callbacks.push(callback);
	}

	public get Callback() {
		return this.callbacks;
	}

	public removeCallback(id: string): void {
		this.callbacks.splice(this.callbacks.findIndex(callback => callback.id), 1);
	}

	setEager(): void {
		this.lazy = false;
	}

	setLazy(): void {
		this.lazy = true;
	}

}

interface Callback {
	id: string;
	context: object;
	callback: Function;
	args: unknown[];
}