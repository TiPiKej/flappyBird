const tubeWidth = 50;
const jumpingKeys = ["W", "SPACE", "Up_Arrow"];
const pointsSpeed = 0.06;

let topBird, leftBird;

let points, distance;

let tubes = [];
let tubesActive = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  topBird = 100;
  leftBird = 100;
  points = 0;
  distance = 0;
  tubes = [];
}

function draw() {
  background(51);

  bird();

  createTube();

  moveTubes();
  drawTubes();

  distance += pointsSpeed;
  distance = round(distance * 100) / 100;
}

function bird() {
  ellipse(leftBird, topBird, tubeWidth);

  let jump = false;
  jumpingKeys.forEach(keyCode => {
    if (Key.isDown(Key[keyCode])) jump = true;
  });
  if (jump && topBird - tubeWidth * 0.5 > 0) topBird -= pointsSpeed * 150;

  let death = false;
  if (topBird + tubeWidth * 0.5 >= windowHeight) death = true;
  tubes.forEach(tube => {
    if (
      windowWidth - tube.right > leftBird - tubeWidth / 2 &&
      windowWidth - tube.right < leftBird + tubeWidth / 2 &&
      (tube.randomTop > topBird - tubeWidth * 0.5 ||
        tube.randomTop + tube.randomHeight < topBird + tubeWidth * 0.5)
    )
      death = true;
  });

  if (death) gameover();

  topBird += pointsSpeed * 50;
}

function createTube() {
  if (
    round(distance * 100) / 100 === round(distance) &&
    round(distance) % 2.5 === 0
  ) {
    const randomTop = random(100, windowHeight - 100 - 230);
    const randomHeight = random(170, 230);
    const right = 0;

    tubes.push({
      randomTop,
      randomHeight,
      right
    });
  }
}

function moveTubes() {
  tubes.forEach(el => {
    el.right += pointsSpeed * 25;
  });
}

function drawTubes() {
  tubesActive = tubes.filter(tube => {
    return tube.right < windowWidth;
  });

  tubesActive.forEach(tube => {
    rect(windowWidth - tube.right, 0, tubeWidth, tube.randomTop);
    rect(
      windowWidth - tube.right,
      tube.randomTop + tube.randomHeight,
      tubeWidth,
      windowHeight
    );
  });
}

function gameover() {
  points = tubes.length - tubesActive.length;
  console.log("gameover", "Your points: " + points);
  frameRate(0);
}
