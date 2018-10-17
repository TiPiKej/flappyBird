class PipesObj {
  constructor() {
    this.pipeWidth = 50;
    this.activePipes = [];
    this.pipeSpeed = 1;
  }

  draw() {
    if (frameCount % 300 === 1) this.addPipe();
    fill(255);
    this.activePipes.forEach(pipe => {
      rect(width - pipe.right, 0, this.pipeWidth, pipe.top);
      rect(
        width - pipe.right,
        pipe.holeHeight + pipe.top,
        this.pipeWidth,
        height - (pipe.holeHeight + pipe.top)
      );
    });
    this.update();
    this.removeNotVisible();
  }

  update() {
    this.activePipes.forEach(pipe => {
      pipe.right += this.pipeSpeed;
    });
  }

  addPipe() {
    this.activePipes.push({
      right: 0,
      top: random(150, height - 150),
      holeHeight: random(80, 200)
    });
  }

  removeNotVisible() {
    this.activePipes = this.activePipes.filter(
      pipe => pipe.right - this.pipeWidth < width
    );
  }

  checkForHit(birdTop, birdLeft, birdRadius) {
    let firstPipe = this.activePipes[0];

    if (
      birdLeft - birdRadius - this.pipeWidth < width - firstPipe.right &&
      birdLeft + birdRadius > width - firstPipe.right &&
      (birdTop < firstPipe.top ||
        birdTop + birdRadius > firstPipe.top + firstPipe.holeHeight)
    )
      return true;

    return false;
  }
}
