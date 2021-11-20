var LOGO = 0;
var PLAY = 1;
var END = 2;
var gameState = 0;

var box1, box2, box3, box4, boxGrp;
//var Dx, Dy;
var deposit;

var DR, DRimg;
var rect, trash, trashGrp;
var map, sea;
var health = 100;
var TC = 0;

var obstacles;
var button;
var timerValue = 60;

var bagI, bottleI, maskI, sodaI, trashI;
var logo, logoI;
var restart, restartI;

function preload()
{
	DRimg = loadImage("img/submarine.png");
  seaImg = loadImage("img/sea.png");

  bagI = loadImage("img/bag.png");
  bottleI = loadImage("img/bottle.png");
  maskI = loadImage("img/mask.png");
  sodaI = loadImage("img/soda-can.png");
  trashI = loadImage("img/trash-bag.png");

  logoI = loadImage("img/logo.png");
  restartI = loadImage("img/restart.png");

}

function setup() {
	createCanvas(displayWidth, displayHeight-150);
  //createCanvas(840, 840);

    sea = createSprite(0, 1700, 3416, 2016);
    sea.addAnimation("sea", seaImg);

    animals = new Group();
    for (var j = 0; j < 25; j++) {
      var a = createSprite(random(-1750, 1750), random(650 ,2750), 60, 30);
      a.shapeColor = "green";
      animals.add(a);
      
    }
    
    DR = createSprite(60, 580, 80,60);
    DR.shapeColor = "blue"; 
    DR.addImage("DR", DRimg);
    DR.scale = 0.7;
    DR.setCollider("rectangle", 0, 20, 225, 100, 0);

    obstacles = new Group();
    for (var i = 0; i < 50; i++) {
      var o = createSprite(random(-1750, 1750), random(650 ,2750), 60, 30);
      
      var rand = Math.round(random(1,5));
      switch(rand) {
        case 1: o.addImage(bagI);
                break;
        case 2: o.addImage(bottleI);
                break;
        case 3: o.addImage(maskI);
                break;
        case 4: o.addImage(sodaI);
                break;
        case 5: o.addImage(trashI);
                break;
        default: break;
      }

      o.scale = 0.15;

      obstacles.add(o);
    }

    button = createButton('start');
    button.position(DR.x-50, DR.y -230);
    button.size(100, 50);
    //button.style("font-family", "Comic Sans MS");
    button.style("font-size", "30px");
    button.mousePressed(timerCountdown);
    
    restart = createSprite(displayWidth/2,140);
    restart.addImage(restartI);
    restart.scale = 0.6;
    restart.visible = false;

    // logo = createSprite(60, 580);
    // logo.addImage(logoI);
        
}

function draw() {
  rectMode(CORNER);
  background(50);

  camera.position.x = DR.x;
  camera.position.y = DR.y;

  if(gameState === 0){
    timerValue = 60;
    DR.x = 60;
    DR.y = 580;
    TC = 0;
    
    

  }
  if(gameState === 1){

      if(DR.isTouching(obstacles, removeBlocks)){
        TC = TC + 1
      }

      console.log("DR", DR.x, DR.y);
      //console.log(gameState);

      collide();
      Dmovement();
      
      
      textSize(100);
      if (timerValue == 0) {
        text("GAME OVER", DR.x - 300, DR.y);
        gameState = 2;
      }

  }

  if(gameState === 2){
    obstacles.destroy();

    restart.visible = true;
    

  }

  drawSprites();
      
  textAlign(CENTER, CENTER);
  fill("white");
  strokeWeight(100);
  textSize(20);
  text("Trash Collected : " +TC, DR.x + 350, DR.y - 250);

  textSize(60);
  text(timerValue, DR.x, DR.y - 260);

  

  //L -1026 682
  //R  1025 580
  //D  60 2393

  
}

function spawnT(){
  obstacles = new Group();
    for (var i = 0; i < 50; i++) {
      var o = createSprite(random(-1750, 1750), random(650 ,2750), 60, 30);
      
      var rand = Math.round(random(1,5));
      switch(rand) {
        case 1: o.addImage(bagI);
                break;
        case 2: o.addImage(bottleI);
                break;
        case 3: o.addImage(maskI);
                break;
        case 4: o.addImage(sodaI);
                break;
        case 5: o.addImage(trashI);
                break;
        default: break;
      }

      o.scale = 0.15;

      obstacles.add(o);
    }
}

function timerCountdown() {
  gameState = 1;
  setInterval(function() {
    if (timerValue > 0) {
      timerValue--;
    }
  }, 1000);
}

function timeIt() {
  // if (timerValue > 0) {
  //   timerValue--;
  // }
}

function removeBlocks(sprite, obstacle){
  obstacle.remove();
}

function Dmovement(){
  //safety
  if(keyDown("P")){
    DR.x = 60;
    DR.y = 580;
    DR.velocityX = 0;
    DR.velocityY = 0;
  }

  //movement
  if(keyDown("W") || keyDown(UP_ARROW)){
    //DR.y = DR.y - 15;
    DR.velocityY = DR.velocityY - 1;
  }
  if(keyDown("S") || keyDown(DOWN_ARROW)){
    //DR.y = DR.y + 15;
    DR.velocityY = DR.velocityY + 1;
  }
  if(keyDown("A") || keyDown(LEFT_ARROW)){
    //DR.x = DR.x - 15;
    DR.velocityX = DR.velocityX - 1;
  }
  if(keyDown("D") || keyDown(RIGHT_ARROW)){
    //DR.x = DR.x + 15;
    DR.velocityX = DR.velocityX + 1;
  }

  //Brake
  if(keyDown("space")){
    DR.velocityY = 0;
    DR.velocityX = 0;
  }

  //gravity
  //DR.velocityY = DR.velocityY + 0.2;
  //box1.velocityY = box1.velocityY + 0.3;

  //water resistance
  if(DR.velocityX > 0){
    DR.velocityX = DR.velocityX - 0.15;
  }
  if(DR.velocityX < 0){
    DR.velocityX = DR.velocityX + 0.15;
  }
  if(DR.velocityY < 0){
    DR.velocityY = DR.velocityY + 0.15;
  }
  if(DR.velocityY > 0){
    DR.velocityY = DR.velocityY - 0.15;
  }
}

function collide(){
  //DR.collide(animals);
  //boxes
  //DR.collide(box1);
}

//ignore
function spawnTrash() {
    // var trash = createSprite(random(-1750, 1750), random(650 ,2750), 10, 40);
    // trash.setCollider("rectangle");
    // trash.debug = true;
    
    //generate random obstacles
    // var rand = Math.round(random(1,6));
    // switch(rand) {
    //   case 1: obstacle.addImage(obstacle1);
    //           break;
    //   case 2: obstacle.addImage(obstacle2);
    //           break;
    //   case 3: obstacle.addImage(obstacle3);
    //           break;
    //   case 4: obstacle.addImage(obstacle4);
    //           break;
    //   case 5: obstacle.addImage(obstacle5);
    //           break;
    //   case 6: obstacle.addImage(obstacle6);
    //           break;
    //   default: break;
    // }
    
    //assign scale and lifetime to the obstacle           
    // trash.scale = 0.5;
    // obstacle.lifetime = displayWidth/obstacle.velocityX+5;
    //add each obstacle to the group
    // trashGrp.add(trash);
}