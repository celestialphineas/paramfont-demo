import { Point, Segment, Path, Shape } from './primitives';

type Vectorial = Point | Segment | Path | Shape;
type VectorialNames = 'Point' | 'Segment' | 'Path' | 'Shape';
type Mat2D = [[number, number], [number, number]];
type Mat3D = [[number, number, number], [number, number, number], [number, number, number]];

class WrappedVector {
  private type: VectorialNames;
  constructor(private vObj: Vectorial) {
    const err = Error(`${vObj} is not a Vectorial object.`);
    if(!vObj) throw err;
    let first = vObj as any[];
    let count = -1;
    while(first.constructor === Array) {
      first = first[0];
      count++;
    }
    try {
      this.type = ['Point', 'Segment', 'Path', 'Shape'][count] as VectorialNames;
    } catch (error) { throw err; }
  }
  get() { return this.vObj; }

  private addPoint = (pt1: Point, pt2: Point) => [ pt1[0] + pt2[0], pt1[1] + pt2[1] ] as Point;
  /** 
   * Vector addition
   * @param direction A point object as a direction
   */
  add(direction: Point): WrappedVector {
    switch(this.type) {
      case 'Point':   return vec(this.addPoint(this.vObj as Point, direction));
      case 'Segment': return vec((this.vObj as Segment).map(pt => this.addPoint(pt, direction)) as Segment);
      case 'Path':    return vec((this.vObj as Path).map(segment => vec(segment).add(direction).get()) as Path);
      case 'Shape':   return vec((this.vObj as Shape).map(path => vec(path).add(direction).get()) as Shape);
    }
  }
  /**
   * Additional inverse
   * @param direction 
   */
  inv(): WrappedVector {
    switch(this.type) {
      case 'Point':   return vec([ - (this.vObj as Point)[0], - (this.vObj as Point)[1] ] as Point);
      case 'Segment': return vec((this.vObj as Segment).map(pt => vec(pt).inv().get())as Segment);
      case 'Path':    return vec((this.vObj as Path).map(segment => vec(segment).inv().get())as Path);
      case 'Shape':   return vec((this.vObj as Shape).map(path => vec(path).inv().get())as Shape);
    }
  }
  /**
   * Vector substraction
   * @param direction A point object as a direction
   */
  sub(direction: Point): WrappedVector {
    return this.add(vec(direction).inv().get() as Point);
  }
  /**
   * Scalar multiplication
   * @param scaleX X direction scale
   * @param scaleY Y direction scale, equals to scaleX if omitted
   */
  mul(scaleX: number, scaleY?: number): WrappedVector {
    if(!scaleY) scaleY = scaleX;
    switch(this.type) {
      case 'Point':   return vec([ (this.vObj as Point)[0] * scaleX, (this.vObj as Point)[1] * scaleY ]);
      case 'Segment': return vec((this.vObj as Segment).map(pt => vec(pt).mul(scaleX, scaleY).get()) as Segment);
      case 'Path':    return vec((this.vObj as Path).map(segment => vec(segment).mul(scaleX, scaleY).get()) as Path);
      case 'Shape':   return vec((this.vObj as Shape).map(path => vec(path).mul(scaleX, scaleY).get()) as Shape);
    }
  }
  /**
   * Linear transformation, left matrix multiplication
   * @param matrix A 2D/3D matrix, transforming in a homogeneous coordinate if using a 3D matrix
   */
  lmat(matrix: Mat2D | Mat3D): WrappedVector {
    switch(this.type) {
      case 'Point': {
        const [x, y] = this.vObj as Point;
        if(matrix as Mat2D) {
          const [[a, b], [c, d]] = matrix as Mat2D;
          return vec([ a * x + b * y, c * x + d * y ]);
        } else {
          const [[a, b, c], [d, e, f], [g, h, i]] = matrix as Mat3D;
          const t1 = a * x + b * y + c;
          const t2 = d * x + e * y + f;
          const t3 = g * x + h * y + i;
          return vec([ t1 / t3, t2 / t3 ]);
        }
      }
      case 'Segment': return vec((this.vObj as Segment).map(pt => vec(pt).lmat(matrix).get()) as Segment);
      case 'Path':    return vec((this.vObj as Path).map(segment => vec(segment).lmat(matrix).get()) as Path);
      case 'Shape':   return vec((this.vObj as Shape).map(path => vec(path).lmat(matrix).get()) as Shape);
    }
  }
  /**
   * Rotation
   * @param center Rotation center
   * @param rad Rotation angle in rad (counterclockwise)
   */
  rot(center: Point, rad: number): WrappedVector {
    const [cx, cy] = center;
    const [cost, sint] = [ Math.cos(rad), Math.sin(rad) ];
    const mat = [
      [ cost, -sint,  cx - cost * cx + sint * cy ],
      [ sint,  cost,  cy - sint * cx - cost * cy ],
      [    0,     0,                           1 ]
    ] as Mat3D;
    return this.lmat(mat);
  }
}

/**
 * Wrapping a vectorial object to do math transformation
 * @param vObj A Point/Segment/Path/Shape object
 * @throws when the parameter is invalid
 */
export default function vec(vObj: Vectorial): WrappedVector {
  return new WrappedVector(vObj);
}
