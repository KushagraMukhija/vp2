//Create variables here
var dog,happyDog,database,foodS,foodStock
var lastFed,foodObj,FeedTime
function preload()
{
  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  
  //load images here
}

function setup() {
  createCanvas(500,500);
  database = firebase.database()
  dogSprite = createSprite(250,250)
  dogSprite.addImage("dogSprite",dog)
  dogSprite.scale = 0.15
  foodStock=database.ref('Food')                                        
 foodStock.on("value",readStock)
 feed=createButton("Feed the dog")
 feed.position(700,95)
 feed.mousePressed(feedDog)

 addFood=createButton("Add Food")
 addFood.position(800,95)
 addFood.mousePressed(addFoods)
  
}


function draw() {  
 background("cyan")
 
  drawSprites();
 // After drawSprites() write the text to print foodStock from the database.
//Use textSize to increase the size of the text, fill() to set text color and stroke() to outline the text.
//(You can add one more text in draw() to show as an instruction on Canvas)
  //add styles here
  text("FEED",250,340)
  fill(255,255,254)
  textSize(15)
  if(lastFed>=0){
    text("Last Fed:"+lastFed%12 + "PM",350,30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
    
  }else{
    text("Last Feed : 12AM",350,30)
  }
  }

  function readStock(data){
    foodS=data.val()
  }

  function writeStock(x){
    if(x<=0){
      x=0
    }
    else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })

  }

  function feedDog(){
    dogSprite.addImage("dogSprite",happyDog)

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food:foodObj.getFoodStock()
    
    })
  }

  function addFoods(){
    foodS++
    database.ref('/').update({
      Food:foodS
    })
  }




