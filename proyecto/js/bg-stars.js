//Get context and screen size;
var ctx = cnv.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;

//Set Canvas and Background Color;
cnv.width = W;
cnv.height = H;
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, W, H);

//Glow effect;
ctx.shadowBlur = 10;
ctx.shadowColor = "white";

paintStars = () => {
  let x = W * Math.random();
  let y = H * Math.random();
  let r = 1 * Math.random();

  //Draw the stars;
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};

for (let index = 0; index < 100; index++) {
  paintStars();
}

let count = 1;

animate = () => {
  paintStars();

  if (count < 200) {
    count++;
    setTimeout(animate, 700);
  }
};
animate();
