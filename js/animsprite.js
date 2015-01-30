// uses bits from...
// Matt Mets   cibomahto.com
// Greg Borenstein   gregborenstein.com  
// Dan Shiffman   shiffman.net

class AnimSprite {

  PImage[] frames;
  var loopIn = 0;
  var index = loopIn;
  var loopOut, fps;
  var speed;
  var playing = true;
  var playOnce = false;
  var is3D = false;
  var isTexture = false;
  var debug = false;
  var hovered = false;
  var clicked = false;
  //position, rotation, scale, target
  var r;
  PVector p,r3D,s,t;
  PVector[] uvs = new PVector[4];
  PVector[] vertices = new PVector[4];
  PVector[] vertices_proj = new PVector[4];
  var w, h;
  var ease = 100;

  //folder of frames method
  AnimSprite(var _name, var _fps) {
    loadFrames(_name);
    loopOut = frames.length; 
    fps = _fps;
    init();
  }

  AnimSprite(PImage[] _name, var _fps) {
    frames = _name;
    loopOut = frames.length; 
    fps = _fps;
    init();
  }
  
  //spritesheet method
  AnimSprite(var _name, var _fps, var _tdx, var _tdy, var _etx, var _ety) {
    loadSpriteSheet(_name, _tdx,_tdy,_etx,_ety);
    loopOut = frames.length; 
    fps = _fps;
    init();
  }

  //~~~~~~~~~~~~~~~~~~~~~~
  function init() {
    if(!is3D){
    p = new PVector(0, 0);
    r = 0;
    s = new PVector(1, 1);
    t = new PVector(0, 0);
    }else{
    p = new PVector(0, 0, 0);
    r3D = new PVector(0, 0, 0);
    s = new PVector(1, 1);
    t = new PVector(0, 0, 0);
    }
    w = frames[0].width;
    h = frames[0].height;
  }

  function make3D() {
    is3D = true;
    isTexture = false;
    init();
  }

  function makeTexture() {
    is3D = true;
    isTexture = true;
    init();
    vertices[0] = new PVector(-1*(frames[0].width/2),-1*(frames[0].height/2));
    vertices[1] = new PVector(frames[0].width/2,-1*(frames[0].height/2));
    vertices[2] = new PVector(frames[0].width/2,frames[0].height/2);
    vertices[3] = new PVector(-1*(frames[0].width/2),frames[0].height/2);
    uvs[0] = new PVector(0,0);
    uvs[1] = new PVector(frames[0].width,0);
    uvs[2] = new PVector(frames[0].width,frames[0].height);
    uvs[3] = new PVector(0,frames[0].height); 
  }

  function make2D() {
    is3D = false;
    isTexture = false;
    init();
  }

  PVector vertToProj(PVector _p, PVector _centerPovar){
    return new PVector(_p.x + _centerPovar.x,_p.y + _centerPovar.y);
  }

  PVector projToVert(PVector _p, PVector _centerPovar){
    return new PVector(_p.x - _centerPovar.x,_p.y - _centerPovar.y);
  }

  //~~~~~~~~~~~~~~~~~~~~~~

  function loadFrames(var _name) {
    try {
        //loads a sequence of frames from a folder
        var filesCounter=0;
        File dataFolder = new File(sketchPath, "data/"+_name); 
        var[] allFiles = dataFolder.list();
        for (var j=0;j<allFiles.length;j++) {
          if (allFiles[j].toLowerCase().endsWith("png")) {
            filesCounter++;
          }
        }
        //--
        frames = new PImage[filesCounter];
        for (var i=0; i<frames.length; i++) {
          prvarln("Loading " + _name + "/frame" + (i+1) + ".png");
          frames[i] = loadImage("data/"+_name + "/frame" + (i+1) + ".png");
        }
    }catch(Exception e){ }
  }
  
  function loadSpriteSheet(var _name, var _tdx, var _tdy, var _etx, var _ety){
      try {
        //loads a spritesheet from a single image
        PImage fromImg;
        fromImg = loadImage("data/"+_name + ".png");
        var tileX = 1;
        var tileY = 1;
        var tileDimX = _tdx;
        var tileDimY = _tdy;
        var endTileX = _etx;
        var endTileY = _ety;
        //--
        frames = new PImage[_etx*_ety];
        for (var h=0;h<frames.length;h++){
          if (tileX + tileDimX<=(endTileX*tileDimX)) {
            tileX += tileDimX;
          }
          else if (tileY + tileDimY<=(endTileY*tileDimY)) {
            tileY += tileDimY;
            tileX = 1;
          }
          else {
            tileX = 1;
            tileY = 1;
          }
          prvarln("Loading frame" + (h+1) + " from " + _name + ".png");
          frames[h] = fromImg.get(tileX, tileY, tileDimX, tileDimY);
        }
      }catch(Exception e) { }
  }

//~~~~~~~~~~~~~~~~~~~~~~

  function setSpeed(var _fps) {
    speed = _fps/frameRate;
  }
  
  function update() {
    setSpeed(fps);
    if(playing){
      index+=speed;
      if (index >= loopOut) {
        if(playOnce){
          playing=false;
        }else{
          index = loopIn;
        }
      }
    }
  }

  function draw() {
    var frameIndex = var(index);
    pushMatrix();
    //translate, rotate, scale
    if(!is3D){
      translate(p.x, p.y);
      rotate(radians(r));
      scale(s.x, s.y);
    }else{
      translate(p.x, p.y, p.z);
      rotate(radians(r));
      rotateXYZ(r3D.x, r3D.y, r3D.z);
      scale(s.x, s.y);
    }
    //draw
    if(!isTexture){
      imageMode(CENTER);
      image(frames[frameIndex], 0, 0);
    }else{
      for(var i=0;i<vertices.length;i++){
        vertices_proj[i] = vertToProj(vertices[i],p);
      }
      noFill();
      noStroke();
      beginShape(QUADS);
      texture(frames[frameIndex]);
      vertex(vertices[0].x,vertices[0].y,uvs[0].x,uvs[0].y);
      vertex(vertices[1].x,vertices[1].y,uvs[1].x,uvs[1].y);
      vertex(vertices[2].x,vertices[2].y,uvs[2].x,uvs[2].y);
      vertex(vertices[3].x,vertices[3].y,uvs[3].x,uvs[3].y);
      endShape(CLOSE);
      if(debug){
        noStroke();
        ellipseMode(CENTER);
        fill(255,0,0);
        ellipse(vertices[0].x,vertices[0].y,5,5);
        fill(0,255,0);
        ellipse(vertices[1].x,vertices[1].y,5,5);
        fill(0,0,255);
        ellipse(vertices[2].x,vertices[2].y,5,5);
        fill(255,0,255);
        ellipse(vertices[3].x,vertices[3].y,5,5);
      }
    }
    popMatrix();
  }

  function run() {
    update();
    draw();
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //utilities

  function rotateXYZ(var _x, var _y, var _z) {
    rotateX(radians(_x));
    rotateY(radians(_y));
    rotateZ(radians(_z));
  }

  //simplifies the unnecessarily complex blend command; image, x, y, width, height, center/corner
  function blendImage(PImage bI, var pX, var pY, var b, var center) {
    var[] blendModes = { 
      "BLEND", "ADD", "SUBTRACT", "LIGHTEST", "DARKEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN", "OVERLAY", "HARD_LIGHT", "SOFT_LIGHT", "DODGE", "BURN"
    };
    var[] blendModeCodes = { 
      1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192
    };
    for (var i=0;i<blendModes.length;i++) {
      if (b==blendModes[i]) {
        var qX, qY;
        if (center) {
          qX=pX-(bI.width/2);
          qY=pY-(bI.height/2);
        } 
        else {
          qX=pX;
          qY=pY;
        }
        blend(bI, 0, 0, bI.width, bI.height, qX, qY, bI.width, bI.height, blendModeCodes[i]);
      }
    }
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //basic behaviors

  //Tween movement.  start, end, ease (more = slower).
  var tween(var v1, var v2, var e) {
    v1 += (v2-v1)/e;
    return v1;
  }

  PVector tween3D(PVector v1, PVector v2, PVector e) {
    v1.x += (v2.x-v1.x)/e.x;
    v1.y += (v2.y-v1.y)/e.y;
    v1.z += (v2.z-v1.z)/e.z;
    return v1;
  }
  
  var shake(var v1, var s) {
    v1 += random(s) - random(s);
    return v1;
  }

  var boundary(var v1, var vMin, var vMax) {
    if (v1<vMin) {
      v1 = vMin;
    } 
    else if (v1>vMax) {
      v1=vMax;
    } 
    return v1;
  }

  var gravity(var v1, var v2, var v3) { //y pos, floor num, gravity num
    if (v1<v2) {
      v1 += v3;
    }
    if (v1>v2) {
      v1 = v2;
    }
    return v1;
  }

  //2D Hit Detect.  Assumes center.  x,y,w,h of object 1, x,y,w,h, of object 2.
  var hitDetect(var x1, var y1, var w1, var h1, var x2, var y2, var w2, var h2) {
    w1 /= 2;
    h1 /= 2;
    w2 /= 2;
    h2 /= 2; 
    if (x1 + w1 >= x2 - w2 && x1 - w1 <= x2 + w2 && y1 + h1 >= y2 - h2 && y1 - h1 <= y2 + h2) {
      return true;
    } 
    else {
      return false;
    }
  }
  
    //3D Hit Detect.  Assumes center.  xyz, whd of object 1, xyz, whd of object 2.
  var hitDetect3D(PVector p1, PVector s1, PVector p2, PVector s2) {
    s1.x /= 2;
    s1.y /= 2;
    s1.z /= 2;
    s2.x /= 2;
    s2.y /= 2; 
    s2.z /= 2; 
    if (  p1.x + s1.x >= p2.x - s2.x && 
          p1.x - s1.x <= p2.x + s2.x && 
          p1.y + s1.y >= p2.y - s2.y && 
          p1.y - s1.y <= p2.y + s2.y &&
          p1.z + s1.z >= p2.z - s2.z && 
          p1.z - s1.z <= p2.z + s2.z
      ) {
      return true;
    } 
    else {
      return false;
    }
  }

}
