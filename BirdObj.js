class BirdObj {
  constructor() {
    this.left = 45;
    this.top = windowHeight / 2;
    this.birdRadius = 20;
    this.gravity = 0.15;
    this.velocity = 0;
    this.color = {
      r: 255,
      g: 255,
      b: 255
    };
  }

  draw() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.left, this.top, this.birdRadius * 2);
    this.update();
  }

  checkDownKeys() {
    if (
      Key.isDown(Key.W) ||
      Key.isDown(Key.SPACE) ||
      Key.isDown(Key.Up_Arrow) ||
      touches.length > 0
    )
      return true;
    return false;
  }

  update() {
    if (this.checkDownKeys()) {
      this.velocity = 0;
      this.jump();
    } else {
      this.velocity += this.gravity;
      this.top += this.velocity;

      if (this.top > windowHeight - this.birdRadius)
        this.top = windowHeight - this.birdRadius;
    }
  }

  jump() {
    this.top -= this.gravity * 50;
  }

  gameOver() {
    this.color = {
      r: 255,
      g: 0,
      b: 0
    };
    console.log("gameover");
    setTimeout(() => frameRate(0), 1000 / 60);
  }
}
