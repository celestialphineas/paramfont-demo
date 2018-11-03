import GridCanvas from "gridcanvas";

// TODO: Provide a function to display cubic bezier paths and its points

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
  upm: 1000, ascender: 935, descender: 265, capHeight: 689, xHeight: 527,
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

  // Flags
  private showBorderFlag    = true;
  private showBaselineFlag  = true;
  private showXheightFlag   = true;
  private showCapHeightFlag = true;
  /** Show the border consisting of acsender, descender, left side and right side */
  get showBorder()          { return this.showBorderFlag; }
  set showBorder(newVal)    { this.showBorderFlag = newVal; this.gridCanvas.display(); }
  /** Show baseline reference */
  get showBaseline()        { return this.showBaselineFlag; }
  set showBaseline(newVal)  { this.showBaselineFlag = newVal; this.gridCanvas.display(); }
  /** Show x-height reference */
  get showXheight()         { return this.showXheightFlag; }
  set showXheight(newVal)   { this.showXheightFlag = newVal; this.gridCanvas.display(); }
  /** Show cap height */
  get showCapHeight()       { return this.showCapHeightFlag; }
  set showCapHeight(newVal) { this.showCapHeightFlag = newVal; this.gridCanvas.display(); }

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

  // Reference line styles
  private _outerRefStrokeColor = '#cccccc';
  private _outerRefStrokeWidth = 1.5;
  private _innerRefStrokeColor = '#ffeeee';
  private _innerRefStrokeWidth = 10;
  get outerRefStrokeColor() { return this._outerRefStrokeColor; }
  get outerRefStrokeWidth() { return this._outerRefStrokeWidth; }
  get innerRefStrokeColor() { return this._innerRefStrokeColor; }
  get innerRefStrokeWidth() { return this._innerRefStrokeWidth; }
  set outerRefStrokeColor(newVal) { this._outerRefStrokeColor = newVal; this.gridCanvas.display(); }
  set outerRefStrokeWidth(newVal) { this._outerRefStrokeWidth = newVal; this.gridCanvas.display(); }
  set innerRefStrokeColor(newVal) { this._innerRefStrokeColor = newVal; this.gridCanvas.display(); }
  set innerRefStrokeWidth(newVal) { this._innerRefStrokeWidth = newVal; this.gridCanvas.display(); }

  /**
   * The drawing function on gridCanvas's upper layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawUpper = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, this.gridCanvas.upperLayer.width, this.gridCanvas.upperLayer.height);
    ctx.fillStyle = this._innerRefStrokeColor;
    ctx.lineWidth = this._innerRefStrokeWidth;
    // baseline
    if(this.showBaselineFlag) {
      ctx.fillRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(0) - this._innerRefStrokeWidth/2,
        this.gridCanvas.p2vW(this._advanceWidth), this._innerRefStrokeWidth);
    }
    // x-height
    if(this.showXheightFlag) {
      ctx.fillRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(this._xHeight) - this._innerRefStrokeWidth/2,
        this.gridCanvas.p2vW(this._advanceWidth), this._innerRefStrokeWidth);
    }
    // cap height
    if(this.showCapHeightFlag) {
      ctx.fillRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(this._capHeight) - this._innerRefStrokeWidth/2,
        this.gridCanvas.p2vW(this._advanceWidth), this._innerRefStrokeWidth);
    }

    ctx.strokeStyle = this._outerRefStrokeColor;
    ctx.lineWidth = this._outerRefStrokeWidth * this.gridCanvas.resolution;
    if(this.showBorderFlag) {
      ctx.strokeRect(this.gridCanvas.p2vX(0), this.gridCanvas.p2vY(this._ascender),
        this.gridCanvas.p2vW(this._advanceWidth),
        this.gridCanvas.p2vH(this._ascender + this._descender));
    }
  }
  /**
   * The drawing function on gridCanvas's lower layer
   * @param ctx   2D graphical context of the canvas
   */
  protected redrawLower = (ctx: CanvasRenderingContext2D) => {

  }
}