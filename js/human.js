Human.prototype = Object.create(AnimSprite.prototype);
Human.prototype.constructor = Human;

function Human(_name, _fps, _tdx, _tdy, _etx, _ety) {
  AnimSprite.call(this, _name, _fps, _tdx, _tdy, _etx, _ety);
  this.speed = 10;
  this.jumpHeight = 80;
  this.jumpSpeed = 20;
  this.jump = false;
  this.jumpReady = true;
}

Human.prototype.gotoFrame = function(_c) {
  this.behavior = _c;
  if (this.behavior == "runLeft") {
    this.loopIn = 0;
    this.loopOut = 0;
    this.s.x = -1.0;
  }
  if (this.behavior == "runRight") {
    this.loopIn = 2;
    this.loopOut = 2;
    this.s.x = 1.0;
  }
  if (this.behavior == "stop") {
    this.loopIn = 4;
    this.loopOut = 4;
  }
}

Human.prototype.behaviors = function() {
  if (this.behavior == "runLeft") {
    this.p.x -= this.speed;      
  }

  if (this.behavior == "runRight") {
   this.p.x += this.speed;
  }
  
  if (this.behavior == "stop") {
    //
  }
  
  if (this.jump) {
    this.jumpReady = false;
    if (this.p.y > this.floorNum - this.jumpHeight) {
      this.p.y -= this.jumpSpeed;
    }
    if (this.p.y <= this.floorNum - this.jumpHeight) {
      this.jump = false;
    }
  } else {
    if (this.y == this.floorNum - this.jumpHeight){
      this.jumpReady = true;
    }
  }
  
  this.bounds();
}

Human.prototype.run = function() {
  this.update();
  this.behaviors();
  this.draw();
}