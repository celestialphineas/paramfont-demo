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
  transformedShapes(transformFunction: (coord: number[]) => number[], additionalOffset?: [number, number]): { [name: string]: Shape } {
    let result: { [name: string]: Shape } = {};
    const offset: [number, number] = additionalOffset || [0, 0];
    for(let property in this.shapes) {
      result[property] = this.shapes[property].map(
        path => path.map(
          segment => segment.map(
            point => (transformFunction(((pt: Point) => [pt[0] + offset[0], pt[1] + offset[1]])(point)) as Point)
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
const hRadius = 200;
/** Default glyph outlines for testing */
const defaultGlyphs: { [name: string]: GlyphOutline } = {
  'circle': new GlyphOutline('circle', {
    'main': [
      // Path 1
      [
        // Segment 1
        [ [cRadius, 0], [cRadius * (1 - cRatio), 0], [0, cRadius * (1 - cRatio)], [0, cRadius] ],
        // Segment 2
        [ [0, cRadius], [0, cRadius * (1 + cRatio)], [cRadius * (1 - cRatio), 2*cRadius], [cRadius, 2*cRadius] ],
        // Segment 3
        [ [cRadius, 2*cRadius], [cRadius * (1 + cRatio), 2*cRadius], [2*cRadius, cRadius * (1 + cRatio)], [2*cRadius, cRadius] ],
        // Segment 4
        [ [2*cRadius, cRadius], [2*cRadius, cRadius * (1 - cRatio)], [cRadius * (1 + cRatio), 0], [cRadius, 0] ]
      ]
    ]
  }),
  'ring': new GlyphOutline('ring', {
    'main': [
      // Path 1
      [
        // Segment 1
        [ [cRadius, 0], [cRadius * (1 - cRatio), 0], [0, cRadius * (1 - cRatio)], [0, cRadius] ],
        // Segment 2
        [ [0, cRadius], [0, cRadius * (1 + cRatio)], [cRadius * (1 - cRatio), 2*cRadius], [cRadius, 2*cRadius] ],
        // Segment 3
        [ [cRadius, 2*cRadius], [cRadius * (1 + cRatio), 2*cRadius], [2*cRadius, cRadius * (1 + cRatio)], [2*cRadius, cRadius] ],
        // Segment 4
        [ [2*cRadius, cRadius], [2*cRadius, cRadius * (1 - cRatio)], [cRadius * (1 + cRatio), 0], [cRadius, 0] ]
      ],
      // Path 2
      [
        // Segment 1
        [ [cRadius, cRadius - hRadius], [cRadius + hRadius * cRatio, cRadius - hRadius], [cRadius + hRadius, cRadius - hRadius * cRatio], [cRadius + hRadius, cRadius] ],
        // Segment 2
        [ [cRadius - hRadius + 2*hRadius, cRadius], [cRadius - hRadius + 2*hRadius, cRadius + hRadius * cRatio], [cRadius+ hRadius * cRatio, cRadius - hRadius + 2*hRadius], [cRadius, cRadius + hRadius] ],
        // Segment 3
        [ [cRadius, cRadius + hRadius], [cRadius - hRadius * cRatio, cRadius - hRadius + 2*hRadius], [cRadius - hRadius, cRadius + hRadius * cRatio], [cRadius - hRadius, cRadius] ],
        // Segment 4
        [ [cRadius - hRadius, cRadius], [cRadius - hRadius, cRadius - hRadius * cRatio], [cRadius - hRadius * cRatio, cRadius - hRadius], [cRadius, cRadius - hRadius] ],
      ]
    ]
  })
};
