const fullPageCanvas = document.getElementById('bg-canvas-stars');
const fullPageContext = fullPageCanvas.getContext('2d');

function resizeStarCanvas() {
  fullPageCanvas.width = window.innerWidth;
  fullPageCanvas.height = document.documentElement.scrollHeight;
}
resizeStarCanvas();

const floatingStars = [];

for (let starIndex = 0; starIndex < 100; starIndex++) {
  floatingStars.push({
    posX: Math.random() * fullPageCanvas.width,
    posY: Math.random() * fullPageCanvas.height,
    starRadius: Math.random() * 1.5,
    fallSpeed: Math.random() * 0.5 + 0.2
  });
}

function drawFloatingStars() {
  fullPageContext.clearRect(0, 0, fullPageCanvas.width, fullPageCanvas.height);
  fullPageContext.fillStyle = 'blue';

  floatingStars.forEach(starItem => {
    starItem.posY += starItem.fallSpeed;
    if (starItem.posY > fullPageCanvas.height) {
      starItem.posY = 0;
      starItem.posX = Math.random() * fullPageCanvas.width;
    }
    fullPageContext.beginPath();
    fullPageContext.arc(starItem.posX, starItem.posY, starItem.starRadius, 0, Math.PI * 2);
    fullPageContext.fill();
  });

  requestAnimationFrame(drawFloatingStars);
}

drawFloatingStars();

window.addEventListener('resize', resizeStarCanvas);
