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
  draw();
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

const draw = () => {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const r = 100;
  const d = r / 2;

  ctx.globalCompositeOperation = 'lighter';

  ctx.filter = 'blur(4px)';
  circle(ctx, x - d, y - d, r, RED);
  ctx.filter = 'blur(2px)';
  circle(ctx, x + d, y - d, r, GREEN);
  ctx.filter = 'blur(1px)';
  circle(ctx, x, y + d, r, BLUE);
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
