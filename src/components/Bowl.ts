import ComponentModel from '../ComponentModel';
import CommonParameters from '../CommonParameters';
import { Shape, Path, Segment } from '../math/primitives';
import vec from '../math/VectorMath';
import BezierMath from '../math/BezierMath';
import { isUndefined } from 'util';

export default class Bowl implements ComponentModel {
  private commonParameters: CommonParameters;
  readonly additionalParameters: { [name: string]: any; } = {
    // !IMPORTANT
    // The Ring component does not necessarily follow the common metrics
    xMin: 0, xMax: 600, yMin: 0, yMax: 600
  };
  readonly paramManifest: string[] = [
    // Bounding box
    'xMin', 'xMax', 'yMin', 'yMax',
    // Bowl shape superness
    'hSuper', 'vSuper',
    // Stroke width spec
    'hair', 'curve',
    // Curve angle
    'curveAngle'
  ];

  constructor(parameters: CommonParameters, additionalParameters?: { [name: string]: any }) {
    // Have the common parameter pointing to the common parameters
    this.commonParameters = parameters;
    // Configure the exclusive parameters
    if(additionalParameters) Object.assign(this.additionalParameters, additionalParameters);
  }
  setParameter(parameters: CommonParameters): void {
    this.commonParameters = parameters;
  }
  get paramsInUse(): { [name: string]: any } {
    const mergedParam: { [name: string]: any } = {};
    for(let param of this.paramManifest) {
      let common = (this.commonParameters as { [name: string]: any })[param];
      let added = this.additionalParameters[param];
      mergedParam[param] = isUndefined(added) ? common : added;
    }
    return mergedParam;
  }

  getShape(): Shape {
    const params = this.paramsInUse;
    const hSuper = params.hSuper as number;
    const vSuper = params.vSuper as number;
    const seg0: Segment = [[0, -1], [-hSuper, -1], [-1, -vSuper], [-1, 0]];
    const seg1: Segment = BezierMath.reverse(vec(seg0).lmat([[1, 0], [0, -1]]).get() as Segment) as Segment;
    const seg2: Segment = vec(seg0).lmat([[-1, 0], [0, -1]]).get() as Segment;
    const seg3: Segment = vec(seg1).lmat([[-1, 0], [0, -1]]).get() as Segment;
    const ratioX = 1 - params.curve * 2 / (params.xMax - params.xMin);
    const ratioY = 1 - params.hair * 2 / (params.yMax - params.yMin);
    const relativeOuter: Path = [seg0, seg1, seg2, seg3];
    const relativeInner: Path = BezierMath.reverse(vec(relativeOuter)
      .mul(ratioX, ratioY)
      .get() as Path) as Path;

    return vec([relativeOuter, relativeInner])
      .mul((params.xMax - params.xMin)/2, (params.yMax - params.yMin)/2)
      .add([(params.xMax + params.xMin)/2, (params.yMax + params.yMin)/2]).get() as Shape;
  }
}