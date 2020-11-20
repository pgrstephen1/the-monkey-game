
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survival_time = 0;

var gamestate = 0;
var PLAY = 0;
var END = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
FoodGroup = new Group() ;
obstacleGroup = new Group();
  
 monkey = createSprite(80,315,20,20);
  monkey.addAnimation ("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = true;
  monkey.setCollider("circle",0,0,325);
}


function draw() {
background('white');
  
  ground = createSprite(400,350,900,10);
  
  if(gamestate === PLAY){
    ground.velocityX = -5;
  ground.x = ground.width/2;
    
    if(keyDown('space') && monkey.y >= 310){
    monkey.velocityY = -14;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
    
    if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
  score = score+1;
  }
  
  survival_time = Math.round(frameCount / 30);
    
    SpawnBanana();
SpawnObstacle();
}
  
   monkey.collide(ground);
  
  if(monkey.isTouching(obstacleGroup)){
    gamestate = END;
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }
   
  textSize(20);
  text("Survival time: " + survival_time, 30,30);
  text("Score: "+ score, 300, 30);
  

drawSprites();
}

function SpawnBanana()
{
  if(frameCount % 80 === 0){
     banana = createSprite(400,200,10,10);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(200,330));
    banana.lifetime = -1;
   FoodGroup.add(banana);
    banana.debug = true;
  }
}

function SpawnObstacle()
{
  if(frameCount % 200 === 0){
    obstacle = createSprite(400,325,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = -1;
    obstacle.setCollider("circle",0,0,210);
   obstacleGroup.add(obstacle);
    obstacle.debug = true;
  }
}


