// Group
var pumpkins;

function setup() {
  createCanvas(300, 300);
  pumpkins = new Group();
  for(var i = 0 ; i < 5 ; i++){
    var sprite = createSprite(random(0, width), random(0, height / 2)); 
    sprite.velocity.y = 1; 
    pumpkins.add(sprite);
  }
}

function draw() {
  background(255);
  drawSprites();
}

function mouseClicked() {
   pumpkins.removeSprites();
}
