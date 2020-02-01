import MinO from "./glyphs.ts/MinO";
import CommonParameters from "./CommonParameters";
import GlyphPreviewPanel from "./GlyphPreviewPanel";

export default class GlyphManager {
  readonly glyphDict: { [name: string]: Object } = {
    'o': MinO
  }
  constructor(glyphPreviewPanel: GlyphPreviewPanel, commonParameters: CommonParameters) {
    
  }
}