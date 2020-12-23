var dog, happyDog, normalDog;
var foodS, foodStock;
var database;

function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  normalDog = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(width/2,height/2,50,50);
  dog.addImage(normalDog);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(color(46, 139, 87))

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(foodS===0){
    dog.addImage(normalDog);
  }
  drawSprites();
  textSize(24);
  fill("white");
  text("Press Up Arrow to feed the Dog Milk",50,50);
  text("Milk Remaining: "+foodS,150,450);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}





