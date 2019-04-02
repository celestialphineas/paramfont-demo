/**
 * This class defines the common parameters to manipulate
 */
export default class CommonParameters {
  /** Units per em */
  upm = 600;
  // Vertical metrics
  /** xHeight in unit */
  xHeight = 520;
  private _ascHeight  = 900;
  private _descHeight = 250;
  /** Ascender */
  get ascHeight() { return this._ascHeight; }
  set ascHeight(newVal: number) { this._ascHeight = Math.abs(newVal); }
  /** Relative ascender */
  get rAscHeight() { return this._ascHeight/this.xHeight; }
  set rAscHeight(ratio: number) { this._ascHeight = Math.abs(ratio * this.xHeight); }
  /** Descender (always positive) */
  get descHeight() { return this._descHeight; }
  set descHeight(newVal: number) { this._descHeight = Math.abs(newVal); }
  /** Relative descender */
  get rDescHeight() { return this._descHeight/this.xHeight; }
  set rDescHeight(ratio: number) { this._descHeight = Math.abs(ratio * this.xHeight); }
  /**
   * Following the METAFONT design system,
   * each glyph has a 18-unit width. This parameter
   * tells the UPMs of each such unit
   */
  widthUnit = 30;
}

