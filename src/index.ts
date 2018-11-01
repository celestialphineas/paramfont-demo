import GridCanvas from 'gridcanvas';

window.addEventListener('load', () => {
  let gridCanvas = (window as any).gridCanvas = new GridCanvas('preview');
});
