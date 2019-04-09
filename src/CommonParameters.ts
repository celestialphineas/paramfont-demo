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

  // Horizontal metrics
  /**
   * Following the METAFONT design system,
   * 1 em has a 18-unit width. This parameter
   * tells the UPMs of each such unit
   */
  widthUnit = 30;

  // Weight control
  /** Horizontal hairline */
  hair = 20;
  /** Vertical hairline */
  vair = 20;
  /** Stem */
  stem = 20;
  /** Curve stem width */
  curve = 40;
  /** Curve angle */
  curveAngle = 0;

  // Counter shape
  /** Horizontal superness */
  hSuper = 0.55;
  /** Vertical superness */
  vSuper = 0.55;
}

