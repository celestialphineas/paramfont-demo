import GlyphOutline from './GlyphOutline';
import CommonParameters from './CommonParameters';
import { Shape } from './math/primitives';

export default interface ComponentModel {
  setParameter(parameters: CommonParameters): void;
  /**
   * A list of parameters to be used
   */
  readonly paramManifest: string[];
  readonly paramsInUse: { [name: string]: any };
  /**
   * Exclusive parameters
   * And for some models it may override some common parameters
  */
  readonly additionalParameters: { [name: string]: any };
  getShape(): Shape;
}