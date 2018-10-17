let bird;
let pipes;

function setup() {
  createCanvas(windowWidth, windowHeight);

  bird = new BirdObj();
  pipes = new PipesObj();
}

function draw() {
  background(51);
  pipes.draw();
  bird.draw();

  if (pipes.checkForHit(bird.top, bird.left, bird.birdRadius)) bird.gameOver();
}
