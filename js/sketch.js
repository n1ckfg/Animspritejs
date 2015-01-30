var sW = 640;
var sH = 480;
var sD = (sW+sH)/2;
var fps = 60;
var numParticles = 100;
Bacterium[] bacteria = new Bacterium[numParticles];

function setup() {
  createCanvas(sW, sH);
  frameRate(fps);
  // You can load your sprite from a folder of images like this:
  //example = new AnimSprite("runner",12);
  // ...or from a spritesheet like this:
  //example = new AnimSprite("walksequence",12,150,185,6,5);
  // ...and here's a subclass with behaviors already included:
  Bacterium bacterium = new Bacterium();
  for (var i=0;i<bacteria.length;i++) {
    bacteria[i] = new Bacterium(bacterium.frames);
    bacteria[i].make3D(); //adds a Z axis and other features. You can also makeTexture to control individual vertices.
    bacteria[i].p = new PVector(random(sW), random(sH), random(sD)-(sD/2));
    bacteria[i].index = random(bacteria[i].frames.length);
    bacteria[i].r = 0;
    bacteria[i].t = new PVector(random(sW), random(sH), random(sD)-(sD/2));
  }
}

function draw() {
  background(0);
  for (var i=0;i<bacteria.length;i++) {
    bacteria[i].run();
  }
  prvarln(frameRate);
}

function keyPressed() {
  for (var i=0;i<bacteria.length;i++) {
    bacteria[i].loopIn = 10;
    bacteria[i].loopOut = 12;
  }
}

