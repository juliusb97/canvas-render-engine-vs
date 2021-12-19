import Clickable from "./Clickable";
import Hoverable from "./Hoverable";
import Movable from "./Movable";
import Renderable from "./Renderable";
import RenderContext from "./RenderContext";
import Selectable from "./Selectable";

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

		this.addMouseDownEventListener();
		this.addMouseMoveEventListener();
		this.addMouseUpEventListener();
	}

	cv: HTMLCanvasElement;
	public cx: CanvasRenderingContext2D;
	cvDimensions = { width: 0, height: 0};
	lazy: boolean;

	static layers: Map<string, number> = new Map([
		["base", 1],
		["interact", 100]
	]);
	renderables: Renderable[] = [];
	fillFunction: Function;
	fillColor = "#222";
	time: number;

	clickables: Clickable[] = [];
	hoverables: Hoverable[] = [];
	selectables: Selectable[] = [];
	movables: Movable[] = [];

	moved?: Movable;
	selected?: Selectable;

	//TODO refactor as ES6 Map
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

	addMouseDownEventListener(): void {
		this.cv.addEventListener("mousedown", (e: MouseEvent) => {

			//TODO this is non-standard
			let x: number = (e as any).layerX;
			let y: number = (e as any).layerY;

			if(e.buttons === 2) {
				for(let cli of this.clickables) {
					if(cli.isPointInside(x, y)) {
						cli.onRightClick(e);
					}
				}
				return;
			}

			let previousSelected = this.selected;
			let foundAnyOne = false;

			//Handle clicks
			for(let cli of this.clickables) {
				if(cli.isPointInside(x, y)) {
					if(cli instanceof Movable)
						(cli as Movable).onClick(e);
					else cli.onClick(e);
				}
			}

			//Handle selections
			for(let sel of this.selectables) {
				if(sel.isPointInside((e as any).layerX, (e as any).layerY)) {
					sel.onSelect(e);
					this.selected = sel;
					foundAnyOne = true;
				}
			}

			//Handle moves
			for(let mov of this.movables) {
				if(mov.isPointInside(x, y)) {
					this.moved = mov;
				}
			}

			if(!foundAnyOne) {
				previousSelected?.onDeselect(e);
				this.selected = undefined;
			}
		});
	}

	addMouseMoveEventListener(): void {
		this.cv.addEventListener("mousemove", (e: MouseEvent) => {

			//TODO this is non-standard
			let x: number = (e as any).layerX;
			let y: number = (e as any).layerY;

			this.moved?.onMove(x, y);

			//Handle hoverables
			for(let hov of this.hoverables) {
				if(hov.isPointInside((e as any).layerX, (e as any).layerY)) {
					hov.onHover(e);
				} else {
					hov.onHoverLeave(e);
				}
			}
		});
	}

	addMouseUpEventListener(): void {
		this.cv.addEventListener("mouseup", (e: MouseEvent) => {
			this.moved?.onMoveStop();
			this.moved = undefined;
		});
	}

}

interface Callback {
	id: string;
	context: object;
	callback: Function;
	args: unknown[];
}