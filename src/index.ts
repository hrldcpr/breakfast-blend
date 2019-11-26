const RED = '#eb0404';
const GREEN = '#04eb04';
const BLUE = '#0404eb';

const canvas = document.getElementById('main') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

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
  fillStyle: string,
) => {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};

const fade = () => {
  ctx.fillStyle = 'rgb(90%,90%,90%)';
  ctx.globalCompositeOperation = 'multiply';
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
};

const drawTouch = (x: number, y: number) => {
  const color = [RED, GREEN, BLUE][Math.floor(Math.random() * 3)];
  ctx.globalCompositeOperation = 'lighter';
  circle(
    ctx,
    x * window.devicePixelRatio,
    y * window.devicePixelRatio,
    100,
    color,
  );
};

const animate = () => {
  // TODO also blur
  fade();
  requestAnimationFrame(animate);
};

window.addEventListener('resize', updateCanvas);

canvas.addEventListener('mousemove', e => {
  drawTouch(e.offsetX, e.offsetY);
});

canvas.addEventListener('touchmove', e => {
  // TODO touchstart.preventDefault? touch-action=none?
  for (const touch of e.changedTouches) {
    drawTouch(touch.clientX, touch.clientY);
  }
});

updateCanvas();
requestAnimationFrame(animate);
