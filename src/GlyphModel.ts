import GlyphOutline from './GlyphOutline';
import CommonParameters from './CommonParameters';

export default interface GlyphModel {
  setParameter(parameters: CommonParameters): void;
  /**
   * Exclusive parameters
   * And for some models it may override some common parameters
  */
  readonly additionalParameters: { [name: string]: any };
  getOutline(): GlyphOutline;
}