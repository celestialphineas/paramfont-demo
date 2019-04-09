import { Segment, Path, Shape } from "./primitives";
import vec from "./VectorMath";

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function reverse(line: Segment | Path | Shape): Segment | Path | Shape {
  switch(vec(line).type) {
    case 'Segment': return (clone(line) as Segment).reverse() as Segment;
    case 'Path':    return (line as Path).map(segment => reverse(segment)).reverse() as Path;
    case 'Shape':   return (line as Shape).map(path => reverse(path)) as Shape;
  }
}

export default {
  clone, reverse
}
