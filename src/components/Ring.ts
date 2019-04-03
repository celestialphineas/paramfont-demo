import GlyphModel from '../GlyphModel';
import GlyphOutline from '../GlyphOutline';
import CommonParameters from '../CommonParameters';

export default class Ring implements GlyphModel {
  private commonParameters: CommonParameters;

  constructor(parameters: CommonParameters, exclusiveParameters?: { [name: string]: any }) {
    // Have the common parameter pointing to the common parameters
    this.commonParameters = parameters;
    // Configure the exclusive parameters
    if(exclusiveParameters) Object.assign(this.additionalParameters, exclusiveParameters);
  }
  setParameter(parameters: CommonParameters): void {
    throw new Error("Method not implemented.");
  }
  readonly additionalParameters: { [name: string]: any; } = {
    // !IMPORTANT
    // The Ring component does not necessarily follow the common metrics
    /** Left extrema x coord */
    xMin: 0,
    /** Right extrema x coord */
    xMax: 600,
    /** Bottom extrema y coord */
    yMin: 0,
    /** Top extrema y coord */
    yMax: 600
  };
  getOutline(): GlyphOutline {
    // TODO: to be implemented
    return GlyphOutline.getDefault('ring');
  }
}