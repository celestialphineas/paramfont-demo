import { Point, Segment, Path, Shape } from './primitives';

type Vectorial = Point | Segment | Path | Shape;
type Mat2D = [[number, number], [number, number]];
type Mat3D = [[number, number, number], [number, number, number], [number, number, number]];

class WrappedVector implements WrappedVector {
  constructor(private vObj: Vectorial) {}
  get() { return this.vObj; }

  private addPoint = (pt1: Point, pt2: Point) => [ pt1[0] + pt2[0], pt1[1] + pt2[1] ] as Point;
  /** 
   * Vector addition
   * @param direction A point object as a direction
   */
  add(direction: Point):Vectorial {
    if(this.vObj as Point) return this.addPoint(this.vObj as Point, direction);
    if(this.vObj as Segment) return (this.vObj as Segment).map(pt => this.addPoint(pt, direction)) as Segment;
    if(this.vObj as Path) return (this.vObj as Path).map(segment => vec(segment).add(direction)) as Path;
    return (this.vObj as Shape).map(path => vec(path).add(direction)) as Shape;
  }
  /**
   * Additional inverse
   * @param direction 
   */
  inv(): Vectorial {
    if(this.vObj as Point) return [ - (this.vObj as Point)[0], - (this.vObj as Point)[1] ] as Point;
    if(this.vObj as Segment) return (this.vObj as Segment).map(pt => vec(pt).inv()) as Segment;
    if(this.vObj as Path) return (this.vObj as Path).map(segment => vec(segment).inv()) as Path;
    return (this.vObj as Shape).map(path => vec(path).inv()) as Shape;
  }
  /**
   * Vector substraction
   * @param direction A point object as a direction
   */
  sub(direction: Point): Vectorial {
    return this.add(vec(direction).inv() as Point);
  }
  /**
   * Scalar multiplication
   * @param scaleX X direction scale
   * @param scaleY Y direction scale, equals to scaleX if omitted
   */
  mul(scaleX: number, scaleY?: number): Vectorial {
    if(!scaleY) scaleY = scaleX;
    if(this.vObj as Point) return [ (this.vObj as Point)[0] * scaleX, (this.vObj as Point)[1] * scaleY ];
    if(this.vObj as Segment) return (this.vObj as Segment).map(pt => vec(pt).mul(scaleX, scaleY)) as Segment;
    if(this.vObj as Path) return (this.vObj as Path).map(segment => vec(segment).mul(scaleX, scaleY)) as Path;
    return (this.vObj as Shape).map(path => vec(path).mul(scaleX, scaleY)) as Shape;
  }
  /**
   * Linear transformation, left matrix multiplication
   * @param matrix A 2D/3D matrix, transforming in a homogeneous coordinate if using a 3D matrix
   */
  lmat(matrix: Mat2D | Mat3D): Vectorial {
    if(this.vObj as Point) {
      const [x, y] = this.vObj as Point;
      if(matrix as Mat2D) {
        const [[a, b], [c, d]] = matrix as Mat2D;
        return [ a * x + b * y, c * x + d * y ];
      } else {
        const [[a, b, c], [d, e, f], [g, h, i]] = matrix as Mat3D;
        const t1 = a * x + b * y + c;
        const t2 = d * x + e * y + f;
        const t3 = g * x + h * y + i;
        return [ t1 / t3, t2 / t3 ];
      }
    }
    if(this.vObj as Segment) return (this.vObj as Segment).map(pt => vec(pt).lmat(matrix)) as Segment;
    if(this.vObj as Path) return (this.vObj as Path).map(segment => vec(segment).lmat(matrix)) as Path;
    return (this.vObj as Shape).map(path => vec(path).lmat(matrix)) as Shape;
  }
  /**
   * Rotation
   * @param center Rotation center
   * @param angle Rotation angle in degrees (counterclockwise)
   */
  rot(center: Point, angle: number): Vectorial {
    const [cx, cy] = center;
    const t = angle / 180 * Math.PI;
    const [cost, sint] = [ Math.cos(t), Math.sin(t) ];
    const mat = [
      [ cost, -sint,  cx - cost * cx + sint * cy ],
      [ sint,  cost,  cy - sint * cx - cost * cy ],
      [    0,     0,                           1 ]
    ] as Mat3D;
    return this.lmat(mat);
  }
}

export default function vec(vObj: Vectorial): WrappedVector {
  return new WrappedVector(vObj);
}
