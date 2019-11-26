const RED = '#eb0404';
const GREEN = '#04eb04';
const BLUE = '#0404eb';

const canvas = document.getElementById('main') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const updateCanvas = () => {
  // canvas width and height need to be set separately from css width and height.
  // changing these clears the canvas
  const bounds = canvas.getBoundingClientRect();
  canvas.width = bounds.width * window.devicePixelRatio;
  canvas.height = bounds.height * window.devicePixelRatio;
};

const circle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fillStyle: string
) => {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};

const fade = () => {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
};

const animate = () => {
  fade();
  requestAnimationFrame(animate);
};

window.addEventListener('resize', updateCanvas);
updateCanvas();

canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  const color = [RED, GREEN, BLUE][Math.floor(Math.random() * 3)];
  ctx.filter = 'none';
  ctx.globalCompositeOperation = 'lighter';
  circle(
    ctx,
    offsetX * window.devicePixelRatio,
    offsetY * window.devicePixelRatio,
    100,
    color
  );
});

requestAnimationFrame(animate);
