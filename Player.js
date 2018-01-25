function Player(x,y,isLeft){
    this.x=x;
    this.y=y;
    this.helpy=y;
    this.kicking=false;
    this.punching=false;
    this.w=100;
    this.h=200;
    this.speed=4;
    this.isLeft;
    this.hp=100;
    this.showx;
    this.kickdamage=15;
    this.punchdamage=25;
    this.fireballdamage=35;
    this.fireballscount=0;
    this.ballz=[];
    this.jumping=false;
    this.ducks=false;
    this.standing=true;
    this.swap=false;
    this.ducking=false;
    this.ground=200;
    this.shw=false;
    
   //////////////////////////////////////////////////////////////////////////////////// 
    this.show=function(){ 
      
      if(this.jumping && !this.ducking)
      {
        this.y-=4;
        if(this.y<75) this.jumping=false;
      }
      else if(this.y<this.ground) this.y+=4;
      if(this.standing && this.swap && !this.ducking && !this.ducks)
      {
       this.y-=this.h/2; 
       this.swap=false;
       this.standing=true;
      }
      if(this.ducks){
        this.ducks=false;
        this.y+=this.h/2;
        this.swap=true;
        this.ducking=true;
      }
      if(!this.standing)
      {
        rect(this.x,this.y,this.w,this.h/2);
      }

      if(this.standing){
      rect(this.x,this.y,this.w,this.h/2);//torso
      rect(this.x+this.w/4,this.y-this.w/2,this.w/2,this.w/2);//head
      
      if(this.isLeft){
         rect(this.x,this.y+this.h/2,this.w/2,this.h/2);//norm leg
        if(this.kicking)
          rect(this.x+this.w/2,this.y+this.h/2,100,this.w/2); //kickleg
        else
          rect(this.x+this.w/2,this.y+this.h/2,this.w/2,100); //kickleg passive
        if(this.punching)
          rect(this.x+this.w,this.y+this.h/4,50,50) //fist
      }
      
      
      if(!this.isLeft){
         rect(this.x+this.w/2,this.y+this.h/2,this.w/2,100); //norm leg
        if(this.kicking)
          rect(this.x-this.w/2,this.y+this.h/2,100,this.w/2); //kickleg
        else
          rect(this.x,this.y+this.h/2,this.w/2,100);      //kickleg passive
        if(this.punching)
          rect(this.x-this.w/2,this.y+this.h/4,50,50) //fist
      
      }
    }
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    this.update=function(player){
      if(this.x<player.x) this.isLeft=true;
      else this.isLeft=false;
      if(frameCount%50==0){
        if(this.kicking)
          this.kicking=false;
        if(this.punching)
          this.punching=false;
      
      }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    this.shootFireball=function(){     
      if(this.isLeft){        
        this.ballz.push(new Fireball(this.x+this.w,this.y+this.h/4,this.isLeft));         
      }
      if(!this.isLeft){
        this.ballz.push(new Fireball(this.x,this.y+this.h/4,this.isLeft)); 
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////
    this.health=function(){ 
       if(this.isDead()){
      //   push();
      //   translate(this.x,this.y);
         this.hp=0;         
         this.y=500; 
      //   this.angle=50;
        // translate(-this.x,-this.y);
       //  pop();
       }
       fill(0,255,0);     
       if(this.isLeft)
       {         
         this.showx=map(this.hp,0,100,0,width/2);       
         rect(0,0,this.showx,50);
         fill(255,0,0);
         rect(this.showx,0,width/2-this.showx,50);
       }
       if(!this.isLeft)
       {         
         this.showx=map(this.hp,0,100,0,width/2);       
         rect(width/2,0,this.showx,50);
         fill(255,0,0);
         rect(width/2+this.showx,0,width/2-this.showx,50);
       }
    }
    //////////////////////////////////////
    this.isDead=function(){
      return this.hp<=0; 
    }
    this.kick=function(){
      this.kicking=true;      
    }
    ////////////////////////////////
    this.kicks=function(player){   
    if(this.isLeft){
      if(this.y==player.y)
        if(this.x+this.w/2>=player.x && this.x+this.w/2<=player.x+player.w || this.x+this.w+50>=player.x && this.x+this.w+50<=player.x+player.w )
            player.hp-=this.kickdamage;
    }    
      if(!this.isLeft){
        if(this.y==player.y)
          if(this.x+this.w/2>=player.x && this.x-this.w/2<=player.x+player.w || this.x-50<=player.x && this.x-50>=player.x+player.w )
              player.hp-=this.kickdamage;
      }
    }
    this.punch=function(){
      this.punching=true;
    }
    this.punches=function(player){
      if(this.isLeft){  
        if(this.y==player.y)
          if(this.x+this.w>=player.x && this.x+this.w<=player.x+player.w || this.x+this.w+50>=player.x &&this.x+this.w+50<=player.x+player.w )
            player.hp-=this.punchdamage;
    }
      if(!this.isLeft){
        if(this.y==player.y)
          if(this.x<=player.x+player.w && this.x+this.w>=player.x || this.x-50<=player.x+player.w && this.x-50>=player.x )
            player.hp-=this.punchdamage;
      }
    }
     
    this.move=function(dir){
      this.x+=dir;
    }
    this.jump=function(){
      this.jumping=true;       
    }
    this.duck=function(){       
      this.standing=!this.standing;
      if(this.ducking) this.ducking=false;
      else this.ducks=true;
    }
    this.boost=function(){
      var b=floor(random(1,4));
      switch(b){
       case 1:
       this.hp+=10;
       case 2:
       this.kickdamage+=2;
       case 3:
       this.punchdamage+=4;
       case 4:
       this.fireballdamage+=10;
      }
      console.log(b);
    }
}