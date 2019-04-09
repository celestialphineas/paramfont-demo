export const name = 'VectorMath unit test';

import vec from '../src/math/VectorMath';
import GlyphOutline from '../src/GlyphOutline';
import { Point } from '../src/math/primitives';

// Addition
// Point
console.log('1.1: Point add');
console.log(vec([1, 2]).add([2, 3]).get());
// Segment
console.log('1.2: Segment add');
console.log(vec([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).add([2, 3]).get());
// Path
console.log('1.3: Path add');
console.log(vec([
  [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]],
  [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]],
  [[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]
]).add([2, 3]).get());
// Shape
console.log('1.4: Shape add');
console.log(vec(GlyphOutline.getDefault('ring').shapes['main']).add([2, 3]).get());
// NaN
console.log('1.5: NaN add');
try {
  console.log(vec(NaN as any as Point).add([2, 3]).get());
} catch (error) {
  console.log(error);
}
// null
console.log('1.6: null add');
try {
  console.log(vec(null as any as Point).add([2, 3]).get());
} catch (error) {
  console.log(error);
}
// undefined
console.log('1.7: undefined add');
try {
  console.log(vec(undefined as any as Point).add([2, 3]).get());
} catch (error) {
  console.log(error);
}
// Infinity
console.log('1.8: Infinity add');
try {
  console.log(vec(Infinity as any as Point).add([2, 3]).get());
} catch (error) {
  console.log(error);
}

// Inverse
// Point
console.log('2.1: Point inverse');
console.log(vec([1, 2]).inv().get());
// Segment
console.log('2.2: Segment inverse');
console.log(vec([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).inv().get());

// Substrct
// Segment
console.log('3.2: Segment substract');
console.log(vec([[1, 2], [-2, -3], [0, 0], [NaN, Infinity]]).sub([1, 2]).get());

// Scalar multiplication
console.log('3.3: Path scalar multiplication');
console.log(vec(GlyphOutline.getDefault('ring').shapes['main'][0]).mul(2, 3).get());

// Rotation
console.log('5.3: Path rotation multiplication');
console.log(vec(GlyphOutline.getDefault('ring').shapes['main'][0]).mul(1/600, 1/200).rot(Math.PI/3, [200, 300]).get());


