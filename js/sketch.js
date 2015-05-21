var human_img, bacterium_img, bg_img;
var human, bacterium;
var bacteria = [];
var numBacteria = 10;
var gravityNum = 8;
var floorNum = 350;

var left = false;
var right = false;
var up = false;
var down = false;

function preload() {
  human_img = loadImage("images/walksequence.png");
  bacterium_img = loadImage("images/bacterium.png");
  bg_img = loadImage("images/bg_5.gif");
}

function setup() {
  createCanvas(640,480);
  human = new Human(human_img, 12, 150, 185, 3, 3); // image, fps, tileX, tileY, xpos, 
  human.p = createVector(width/2,floorNum);  

  bacterium = new Bacterium(bacterium_img, 1, 50, 50, 10, 10); // image, fps, tileX, tileY, xpos, 

  for (var i=0; i<numBacteria; i++) {
    bacteria.ease = 1000;
    bacteria.push(bacterium);
  }
}

function draw() {
  image(bg_img, 0, 0);

  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      this.left = true;
    }
    if (keyCode == RIGHT_ARROW) {
      this.right = true;
    }
  }

  if (left && !right) {
    human.gotoFrame("runLeft");
  } else if (!left && right) {
    human.gotoFrame("runRight");
  } else if (!left && !right){
    human.gotoFrame("stop");
  }

  human.run();
  for (var i=0; i< bacteria.length; i++) {
    if (mouseIsPressed) {
      bacteria[i].tween;
    }
    bacteria[i].run();
  }
}

function mousePressed() {
  console.log("mouse pressed");
  for (var i=0; i< bacteria.length; i++) {
    bacteria[i].t = createVector(mouseX,mouseY);
    bacteria[i].gotoFrame("play");
  }
}

function mouseReleased() {
  console.log("mouse released");
  for (var i=0; i< bacteria.length; i++) {
    bacteria[i].gotoFrame("stop");
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    this.left = true;
  }
  if (keyCode == RIGHT_ARROW) {
    this.right = true;
  }    

  if (key === ' ' && human.jumpReady == true) {
    human.jumpReady = false;
    human.jump = true;
  }  
}

function keyReleased() {
  if (keyCode == LEFT_ARROW) {
    this.left = false;
  }
  if (keyCode == RIGHT_ARROW) {
    this.right = false;
  }    

  if (key === ' ') {
    human.jumpReady = true;
    human.jump = false;
  }  
}

