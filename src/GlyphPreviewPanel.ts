import GridCanvas from "gridcanvas";

/**
 * Configuration options
 * @interface
 */
interface Config {
  /** Units per em */
  upm?: number,
  // Basic Metrics
  /**
   * Ascender
   * Distance from the top to the baseline
   */
  ascender?: number,
  /**
   * Descender
   * Distance from the bottom to the baseline
   */
  descender?: number,
  /** Capital height */
  capHeight?: number,
  /** X-height */
  xHeight?: number,
  /** Advance width */
  advanceWidth?: number,
  /** Boundary */
  minX?: number, maxX?: number, minY?: number, maxY?: number
}

var defaultConfig: Config = {
  upm: 1000, ascender: 935, descender: 265, xHeight: 527,
  advanceWidth: 600, 
  minX: -1000, maxX: 2000, minY: -1000, maxY: 1000*1.5
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
  // metrics
  private _upm: number;
  private _ascender: number;
  private _descender: number;
  private _capHeight: number;
  private _xHeight: number;
  private _advanceWidth: number;
  // properties for users
  get upm()           { return this._upm; }
  get ascender()      { return this._ascender; }
  get descender()     { return this._descender; }
  get capHeight()     { return this._capHeight; }
  get xHeight()       { return this._xHeight; }
  get advanceWidth()  { return this._advanceWidth; }
  set upm(newVal)           { if(this.gridCanvas) this.gridCanvas.display(); this._upm = newVal; }
  set ascender(newVal)      { if(this.gridCanvas) this.gridCanvas.display(); this._ascender = newVal; }
  set descender(newVal)     { if(this.gridCanvas) this.gridCanvas.display(); this._descender = newVal; }
  set capHeight(newVal)     { if(this.gridCanvas) this.gridCanvas.display(); this._capHeight = newVal; }
  set xHeight(newVal)       { if(this.gridCanvas) this.gridCanvas.display(); this._xHeight = newVal; }
  set advanceWidth(newVal)  { if(this.gridCanvas) this.gridCanvas.display(); this._advanceWidth = newVal; }

  /**
   * Constructing GlyphPreviewPanel
   * @param elementID   Element id of an HTML div element
   * @param config      Configuration options
   */
  constructor(elementID: string, config?: Config) {
    this.init(elementID, config);
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
    var minX, maxX, minY, maxY: number;
    this._upm           = (config ? config.upm                  : defaultConfig.upm)          || defaultConfig.upm;
    this._ascender      = (config ? config.ascender             : defaultConfig.ascender)     || defaultConfig.ascender;
    this._descender     = (config ? Math.abs(config.descender)  : defaultConfig.descender)    || defaultConfig.descender;
    this._capHeight     = (config ? config.capHeight            : defaultConfig.capHeight)    || defaultConfig.capHeight;
    this._xHeight       = (config ? config.xHeight              : defaultConfig.xHeight)      || defaultConfig.xHeight;
    this._advanceWidth  = (config ? config.advanceWidth         : defaultConfig.advanceWidth) || defaultConfig.advanceWidth;
    minX                = (config ? config.minX                 : -this._upm)                 || -this._upm;
    maxX                = (config ? config.maxX                 : this._upm*2)                || this._upm*2;
    minY                = (config ? config.minY                 : -this._upm)                 || -this._upm;
    maxY                = (config ? config.maxY                 : this._upm * 1.5)            || this._upm*1.5;
    this.gridCanvas = new GridCanvas(elementID, { bound: { minX, maxX, minY, maxY } });
    this.container = this.gridCanvas.container;
    this.gridCanvas.redrawLower = this.redrawLower;
    this.gridCanvas.redrawUpper = this.redrawUpper;
  }

  // TODO: Finish the two functions below
  /**
   * The drawing function on gridCanvas's upper layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawUpper = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, this.gridCanvas.upperLayer.width, this.gridCanvas.upperLayer.height);
    ctx.strokeRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(0), 2, 2);
    console.log([this._descender, this.gridCanvas.bound.minY]);
    // TODO: Use v2ph & v2pw
    ctx.strokeRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(this._ascender),
      this._advanceWidth / this.gridCanvas.zoomFactor,
      (this._ascender + this._descender) / this.gridCanvas.zoomFactor);
    console.log([this._descender, this.gridCanvas.bound.minY]);
  }
  /**
   * The drawing function on gridCanvas's lower layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawLower = (ctx: CanvasRenderingContext2D) => {

  }
}