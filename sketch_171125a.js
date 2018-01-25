var player1, player2;
var powerups=[];

function setup() {
  createCanvas(1200,700);
  player1=new Player(100,200);
  player2=new Player(800,200);
  
}

function draw() {
  players=[player1,player2];
  if(frameCount%500==0)
  {
    powerups.push(new PowerUp());
  }
  strokeWeight(1);
  background(51);
  fill(255);
  stroke(0);
  fill(10,200,20);
  rect(0, 400, width,100);
  fill(200,10,10);
  rect(0,500,width,200);
  fill(255);
  
  player1.show();  
  player2.show();
 
  player1.update(player2);
  player2.update(player1);
  
  player1.health();
  player2.health();
  if(player1.ballz.length>0){
     for(var i=player1.ballz.length-1;i>=0;i--)
     {              
       player1.ballz[i].show();
       player1.ballz[i].update();
       if(player1.ballz[i].hits(player2)){
         player1.ballz.splice(i,1);         
         player2.hp-=player1.fireballdamage;
     }
    }
  }
  if(player2.ballz.length>0){
     for(var i=player2.ballz.length-1;i>=0;i--)
     {              
       player2.ballz[i].show();
       player2.ballz[i].update();
       if(player2.ballz[i].hits(player1)){
         player2.ballz.splice(i,1);         
         player1.hp-=player2.fireballdamage;
     }
    }
  }
  
  if(!player1.isDead()){
    if(keyIsDown(65))
      player1.move(-player1.speed);
    if(keyIsDown(68))
      player1.move(player1.speed);

  }
  if(!player2.isDead()){
    if(keyIsDown(LEFT_ARROW))
      player2.move(-player2.speed);
    if(keyIsDown(RIGHT_ARROW))
      player2.move(player2.speed); 
 
  }
  for(var i=powerups.length-1;i>=0;i--)
     {              
     powerups[i].show(); 
     powerups[i].update(players);
     if(powerups[i].delet){
     powerups.splice(i,1);         
     }
    }

}

function keyPressed(){
  if(!player1.isDead()){
    if(key==' ')
      {
        player1.kick();
        player1.kicks(player2);
      }
    if(key=='C')
      {
        player1.punch();
        player1.punches(player2);
      }
    if(keyCode==86)
    {
      player1.shootFireball();
    }
    if(key=='W')
    {
      player1.jump();
    }
    if(key=='S')
    {
      player1.duck();
    }
  }
  if(!player2.isDead()){
    if(keyCode==188)
      {
        player2.kick();
        player2.kicks(player1);
      }
    if(keyCode==190)
      {
        player2.punch();
        player2.punches(player1);
      }
    if(keyCode==191)
    {
      player2.shootFireball();       
    }
    if(keyCode === UP_ARROW)
    {
      player2.jump();
    }
    if(keyCode==DOWN_ARROW)
    {
      player2.duck();
    }
    }
  /*  if(keyCode==88)
    {
      player1.hp=0;
    }
    if(keyCode==90)
    {
      player2.hp=0;
    }
*/
}