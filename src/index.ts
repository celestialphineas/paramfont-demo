import GlyphPreviewPanel from './GlyphPreviewPanel';
import CommonParameters from './CommonParameters';

window.addEventListener('load', () => {
  const glyphPreviewPanel = (window as any).glyphPreviewPanel = new GlyphPreviewPanel('preview');
});

const globalParams = (window as any).globalParams = new CommonParameters();
