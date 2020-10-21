var dogImg,dogHImg,bottleImg,dog,bottle,mud,mudImg,status,remain,timer,bone,database,over,overI


function preload()
{
  dogImg=loadImage("dogImg.png")
  dogHImg=loadImage("dogImg1.png")
  bottleImg=loadImage("bottle.png")
  mudImg=loadImage("mud.png")
  bone=loadImage("bone.png")
  overI=loadImage("over.png")
}

function setup() {
  createCanvas(800,700);

  mud=createSprite(400,620,10,10)
  mud.addImage(mudImg)
  mud.scale=0.3

  dog=createSprite(400,520,20,20)
  dog.addImage(dogImg)
  dog.scale=0.25

  bottle=createSprite(310,220,20,20)
  bottle.addImage(bottleImg)
  bottle.visible=false
  status="hungry"

  timer=0

  database=firebase.database()
   var foodstock=database.ref("food")
   foodstock.on("value",readStock)
  over=createSprite(width/2,height/2,10,10)
  over.addImage(overI)
  over.scale=0.5
  over.visible=false
 
}


function draw() {  
  background(255,203,43)

  if (frameCount % 30 == 0 && timer > 0) { 
    timer --;
  }

 if(keyDown("space") && bottle.y===220 && remain>0){
     bottle.velocityY=3
     bottle.rotationSpeed=1.75
     bottle.visible=true
   }
     if(bottle.y===220 && bottle.rotationSpeed===-1.75){
      bottle.velocityY=0
      bottle.rotationSpeed=0
      bottle.visible=false
     }
 
 if(bottle.y===430){
  bottle.velocityY=-3
  bottle.rotationSpeed=-1.75
  dog.addImage(dogHImg)
  timer=15
  status="happy"
  //////////////////////////////////////////////////////////////
 if(remain!==undefined){
  if(remain>0){
    writeStock(remain)  
 }
}
 }
 if(timer===0){
   status="hungry"
   dog.addImage(dogImg)
   dog.velocityX=0
   dog.x=400
 }
 if(remain%2===0 && bottle.y===220){
   bottle.addImage(bottleImg)
 }
 if(remain%2!==0 && bottle.y===220){
   bottle.addImage(bone)
 }
 if(timer<=15 && timer>0){
   dog.velocityX=-4
 }
 if(dog.x===0){
   dog.x=820
 }
 
 
 textSize(30)
 stroke (0)
 fill (0)
 text ("pets mood :"+status,240,160)
 textSize(15)
 text("bottles and bones remaining :"+remain,580,20)

 console.log(bottle.y)


 if(remain===0){
    over.visible=true
 }
 if(over.visible===true){
   if(mouseDown(LEFT)||mouseDown(CENTER)){
    writeStock(20)
    over.visible=false
   }
 }



  drawSprites();
}

function readStock(data){
  remain=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

