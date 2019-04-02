import GlyphOutline from './GlyphOutline';
import CommonParameters from './CommonParameters';

export default interface GlyphModel {
  setParameter(parameters: CommonParameters): void;
  exclusiveParamters: { [name: string]: any };
  getOutline(): GlyphOutline;
}