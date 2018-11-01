import GlyphPreviewPanel from './GlyphPreviewPanel';

window.addEventListener('load', () => {
  let gridCanvas = (window as any).gridCanvas = new GlyphPreviewPanel('preview');
});
