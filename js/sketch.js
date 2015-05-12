var spriteSheet;
var foo

function preload() {
  spriteSheet = loadImage("images/walksequence.png");
}

function setup() {
  createCanvas(640,480);
  foo = new AnimSprite(spriteSheet, 12, 150, 185, 3, 3); // image, fps, tileX, tileY, xpos, 
  foo.t.x = 400;
  foo.t.y = 400;
  foo.debug = true;
}

function draw() {
  background(0);
  if(mouseIsPressed) {
  	foo.t = createVector(mouseX,mouseY);
  	foo.tween();
  }

  //foo.falling(10);
  //foo.shaker(10);

  if (foo.hovered) foo.s.x *= -1;
  if (foo.clicked) foo.shaker();

  foo.run();
}





