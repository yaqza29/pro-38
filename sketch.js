var backdrop,backdropi;
var monkey , monkey_running;
var banana ,bananaImage, obstacle,obstacle1, obstacleImage, obstacle1Image;
var FoodGroup, obstacleGroup, obstacle1Group;
var score = 0;
var index = 0;

function preload(){
  
  backdropi = loadImage("backdrop.jfif");
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  obstacle1Image = loadImage("my obstacle1.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  backdrop = createSprite(0,200,300,300);
  backdrop.addImage(backdropi);
  backdrop.scale = 1.3;
  backdrop.x=backdrop.width/2;

  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  obstacle1Group = new Group();

  score = 0;
 
  monkey.debug = false;
  
  
}


function draw() {
  
  background(255);

  camera.position.x = displayWidth/2;
  camera.position.y = monkey[index-1].y;
  
   /*if(backdrop.x> 400) {
    backdrop.x=backdrop.width/2;
  }*/
    
  /*if(ground.x<0) {
    ground.x=ground.width/2;
  }*/
  
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
      monkey.scale = 0.1
    
    }
        
  if(obstacle1Group.isTouching(monkey)){
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstacle1Group.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     obstacle1Group.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
  
    
    }
  
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale + 0.02;
    
  }
  
  stroke(rgb(26, 255, 255));
  textSize(20);
  fill(rgb(26, 255, 255));
  strokeWeight(1.5);
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 50,50);

  stroke(rgb(140, 255, 26));
  textSize(20);
  fill(rgb(140, 255, 26));
  strokeWeight(1.5);
  text("score : "+score,250,50)
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.debug = false;
    banana.setCollider("rectangle",1,1,500,150)
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
     obstacle.debug = false;
  obstacle.setCollider("rectangle",1,1,300,300);
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    obstacle1 = createSprite(400,320,10,40);
    obstacle1.velocityX = -6;
    
     obstacle1.debug = false;
  obstacle1.setCollider("rectangle",1,1,420,300);
    
    //add image to the obstacle 
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle1.lifetime = 300;
    
    //add each obstacle to the group
    obstacle1Group.add(obstacle1);
  }
}
