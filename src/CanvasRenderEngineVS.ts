import _RenderEngine from "./RenderEngine";
import _Color from "./Color";
import _Renderable from "./Renderable";
import _RenderContext from "./RenderContext";
import _Rectangle from "./Rectangle";
import _Circle from "./Circle";
import _Text from "./Text";

const REVS = {
	RenderEngine: _RenderEngine,
	Color: _Color,
	Renderable: _Renderable,
	Rectangle: _Rectangle,
	Circle: _Circle,
	Text: _Text,
};

export default REVS;

//Unfortunately, I didn't manage to make Rollup bundle everything as its
//own object:
// export default {_RenderEngine, _Color, _Renderable, _Rectangle};