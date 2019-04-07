import GlyphPreviewPanel from './GlyphPreviewPanel';
import CommonParameters from './CommonParameters';
import GlyphOutline from './GlyphOutline';
import Bowl from './components/Bowl';

var glyphPreviewPanel: GlyphPreviewPanel;

window.addEventListener('load', () => {
  glyphPreviewPanel = (window as any).glyphPreviewPanel = new GlyphPreviewPanel('preview');
  // TODO: to be removed
  updateTestGlyph();
});

const globalParams = (window as any).globalParams = new CommonParameters();

// TODO: A glyph manager
// A testing manager
const testGlyph = new GlyphOutline('bowl-component');
const testBowl = new Bowl(globalParams);
testGlyph.advanceWidth = 600;
function updateTestGlyph() {
  testGlyph.shapes = { 'main': testBowl.getShape() };
  glyphPreviewPanel.glyphs = [ testGlyph ];
  glyphPreviewPanel.gridCanvas.display();
}
window.addEventListener('param-change', updateTestGlyph);
