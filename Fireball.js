function Fireball(x,y,owner){
  this.fireballspeed=4;
  this.x=x;
  this.y=y;
  this.d=48;
  this.owner=owner;
  
  this.show=function(){
    ellipse(this.x,this.y,this.d);
  }
  this.update=function(){    
    if(this.owner)
      this.x+=this.fireballspeed;
    if(!this.owner)
      this.x-=this.fireballspeed;
  }
  this.hits=function(player){
    if(this.owner){
      if(this.x>player.x && this.x<player.x+player.w && this.y>player.y && this.y<player.y+player.h)
        return true;
    }
    if(!this.owner){
      if(this.x>player.x && this.x<player.x+player.w && this.y>player.y && this.y<player.y+player.h)
        return true;
    }  
  }
  
}