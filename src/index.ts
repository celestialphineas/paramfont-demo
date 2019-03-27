import GlyphPreviewPanel from './GlyphPreviewPanel';

window.addEventListener('load', () => {
  let glyphPreviewPanel = (window as any).glyphPreviewPanel = new GlyphPreviewPanel('preview');
});
