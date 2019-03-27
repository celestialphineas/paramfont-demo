import GridCanvas from 'gridcanvas';
import GlyphOutline from './GlyphOutline';

// TODO: Provide a function to display cubic bezier paths and its points

/**
 * Configuration options
 * @interface
 */
interface Config {
  /** Boundary */
  minX?: number, maxX?: number, minY?: number, maxY?: number
}

var defaultConfig: Config = {
  minX: -500, maxX: 2500, minY: -1000, maxY: 1000*1.5
}

/**
 * Glyph preview window
 * @class
 */
export default class GlyphPreviewPanel {
  /** Container */
  container: HTMLElement;
  /** Grid canvas object */
  gridCanvas: GridCanvas;

  /** A list of the glyph outlines to draw */
  glyphs: GlyphOutline[] = [ GlyphOutline.getDefault('circle') ];

  /**
   * Constructing GlyphPreviewPanel
   * @param elementID   Element id of an HTML div element
   * @param config      Configuration options
   */
  constructor(elementID: string, config?: Config) {
    const mergedConfig = Object.assign(Object.assign({}, defaultConfig), config || defaultConfig);
    this.init(elementID, mergedConfig);
  }
  /**
   * For configurations changes that causing a preview window must be
   * reloaded, changing the viewport boundary for example, this function
   * can be useful to reload the window
   * @param config      Configuration options
   */
  reload(config?: Config) {
    this.gridCanvas.destruct();
    this.init(this.container.id, config);
  }

  // 2-stage constructor
  private init(elementID: string, config?: Config) {
    const [ minX, maxX, minY, maxY ]
      = [ config.minX, config.maxX, config.minY, config.maxY ];
    this.gridCanvas = new GridCanvas(elementID, { bound: { minX, maxX, minY, maxY } });
    this.container = this.gridCanvas.container;
    this.gridCanvas.redrawLower = this.redrawLower;
    this.gridCanvas.redrawUpper = this.redrawUpper;
  }

  /**
   * The drawing function on gridCanvas's upper layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawUpper = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, this.gridCanvas.upperLayer.width, this.gridCanvas.upperLayer.height);
    for(let glyph of this.glyphs) {
      console.log(glyph.transformedShapes(this.gridCanvas.projectToView.bind(this.gridCanvas)));
    }
  }
  /**
   * The drawing function on gridCanvas's lower layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawLower = (ctx: CanvasRenderingContext2D) => {

  }
}