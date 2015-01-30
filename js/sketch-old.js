var numBalls = 500;
var ball = [];
var bgColor = [127,127,0];

function setup() {
  createCanvas(640,480);
  for (var i=0; i<numBalls; i++) {
    ball[i] = new Ball();
  }
  background(bgColor);
}

function draw() {
  noStroke();
  fill(bgColor[0],bgColor[1],bgColor[2],20);
  rect(0,0,width,height);
  for (var i=0; i<numBalls; i++) {
    ball[i].run();
  }
}

function Ball() {
  this.p = [random(width),random(height)];
  this.spread = random(5);
  this.size = random(50);
}

Ball.prototype.update = function() {
  this.p[0] += random(this.spread) - random(this.spread);
  this.p[1] += random(this.spread) - random(this.spread);
}

Ball.prototype.draw = function() {
  noStroke();
  fill(200+random(50),0,0,150);
  ellipse(this.p[0],this.p[1],this.size,this.size);
  fill(255,random(255),0);
  ellipse(this.p[0],this.p[1],2,2);
}

Ball.prototype.run = function() {
  this.update();
  this.draw();
}