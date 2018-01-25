function PowerUp(){
 this.x=random(0,width);
 this.y=random(-50,-20);
 this.w=20;
 this.speed=4;
 this.r=random(0,255); 
 this.g=random(0,255); 
 this.b=random(0,255);
 this.delet=false;
 this.show=function(){
   if(frameCount%50==0){
     this.r=random(0,255); 
     this.g=random(0,255); 
     this.b=random(0,255); 
   }
   fill(this.r,this.g,this.b);
   rect(this.x,this.y,this.w,this.w);
   fill(this.b,this.r,this.g);
   ellipse(this.x+this.w/2,this.y+this.w/2,this.w);
 }
 
 this.update=function(players){
   if(this.y<400-this.w-5)
   this.y+=this.speed;
   for(var i=0;i<=players.length-1;i++)
   {
   if(this.x>players[i].x && this.x+this.w<players[i].x+players[i].w && this.y>players[i].y && this.y+this.w<players[i].y+players[i].h)
   {
   players[i].boost(); 
   this.delet=true;
   }
   
   }
   
 } 
}