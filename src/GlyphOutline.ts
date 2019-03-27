type Point  = [ number, number ];
type Segment = [ Point, Point, Point, Point ];
type Path   = Segment[];
type Shape  = Path[];

/**
 * Glyph outline specification
 * A glyph outline is container for a list of shapes
 */
export default class GlyphOutline {
  /** Width of the glyph */
  advanceWidth: number = 600;
  /** Name of the glyph */
  glyphName: string = 'default';
  /** Shape list */
  shapes: { [name: string]: Shape } = {};
  /** Get the transformed shape */
  transformedShapes(transformFunction: (coord: number[]) => number[]): { [name: string]: Shape } {
      let result: { [name: string]: Shape } = {};
      for(let property in this.shapes) {
        result[property] = this.shapes[property].map(
          path => path.map(
            segment => segment.map(
              point => transformFunction(point) as Point
            )
          ) as Path
        );
      }
      return result;
  }
  
  constructor(glyphName?: string, shapes?: { [name: string]: Shape }) {
    if(glyphName) this.glyphName = glyphName;
    if(shapes) this.shapes = JSON.parse(JSON.stringify(shapes)) as { [name: string]: Shape };
  }

  /** Get the standard samples for testing */
  static getDefault(name?: string): GlyphOutline {
    return defaultGlyphs[name || 'circle'] || defaultGlyphs['circle'];
  }
}

const cRatio = 0.55191502449;
const cRadius = 300;
/** Default glyph outlines for testing */
const defaultGlyphs: { [name: string]: GlyphOutline } = {
  'circle': new GlyphOutline('circle', {
    'main': [
      // Path 1
      [
        // Segment 1
        [ [cRadius, 0], [cRadius * (1 - cRatio), 0], [0, cRadius * (1 - cRatio)], [0, cRadius] ],
        // Segment 2
        [ [0, cRadius], [0, cRadius * (1 + cRatio)], [cRadius * (1 - cRadius), 2*cRadius], [cRadius, 2*cRadius] ],
        // Segment 3
        [ [cRadius, 2*cRadius], [cRadius * (1 + cRatio), 2*cRadius], [2*cRadius, cRadius * (1 + cRatio)], [2*cRadius, cRadius] ],
        // Segment 4
        [ [2*cRadius, cRadius], [2*cRadius, cRadius * (1 - cRatio)], [cRadius * (1 + cRatio), 0], [cRadius, 0] ]
      ]
    ]
  }),
};
