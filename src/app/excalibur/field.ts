import * as ex from 'excalibur';


export class FieldEdge extends ex.Actor {

  draw(ctx, delta){    
    ctx.fillStyle = ex.Color.fromRGB(255,0,0,0);
    ctx.fillRect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
  }

}


export class Endzone extends ex.Actor {

  onInitialize(game){
    this.width = this.width;
    this.height = this.height;
  }
  
  draw(ctx, delta){    
    ctx.fillStyle = ex.Color.fromRGB(0,0,255,0);
    ctx.fillRect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
  }
  
}

export class Field extends ex.Actor {
    
  game;
  w = 53.3;
  h = 120;
  lineWidth = .2;
  yd = 1;
  showCadence = false;
  edges = [];
  leftSideline;
  rightSideline;
  homeBackline;
  awayBackline;
  homeEndzone;
  awayEndzone;

  fieldColor = ex.Color.fromRGB(25,111,12,1);

  
  public onInitialize(game: ex.Engine) {  
    this.game = game;
    this.w *= this.game.scale;
    this.h *= this.game.scale;
    this.width = this.w;
    this.height = this.h;
    this.lineWidth *= this.game.scale;
    this.yd *= this.game.scale;

    this.addEdgesAndEndzones(this.game.scale);

    
    this.body.collider.type = ex.CollisionType.Passive;
    //console.log('field collision area', this.collisionArea);
    this.on('collisionstart', (ev)=>{
      //console.log('collision between field and ', ev.other);
    });
  }

  setRotation(deg){
    this.rotation = deg * Math.PI/180;
  }

  addEdgesAndEndzones(scale){
    let sidelineWidth  = 5 * scale;
    let sidelineOffset = sidelineWidth/2;
    this.leftSideline   = new FieldEdge(0 - this.w/2 - sidelineOffset, 0, sidelineWidth, this.h);
    this.rightSideline  = new FieldEdge (this.w/2 + sidelineOffset, 0, sidelineWidth, this.h);
    this.homeBackline   = new FieldEdge (0, this.h/2 + sidelineOffset, this.w + sidelineWidth, sidelineWidth);
    this.awayBackline   = new FieldEdge (0, 0 - this.h/2 - sidelineOffset, this.w + sidelineWidth, sidelineWidth);
    
    this.game.add(this.leftSideline);
    this.game.add(this.rightSideline);
    this.game.add(this.homeBackline);
    this.game.add(this.awayBackline);
    
    this.edges = [this.leftSideline, this.rightSideline, this.homeBackline, this.awayBackline];

    let endzoneDepth = 10 * scale;
    let endzoneOffset = endzoneDepth / 2;
    this.awayEndzone = new Endzone(0, 0 - this.h/2 + endzoneOffset, this.w, endzoneDepth);
    this.homeEndzone = new Endzone(0, this.h/2 - endzoneOffset, this.w, endzoneDepth);  
    
    this.game.add(this.homeEndzone);
    this.game.add(this.awayEndzone);    
    
    
  }

  draw(ctx, delta) {     

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale.x, this.scale.y);

    // translate canvas by anchor offset
    ctx.save();

    let leftX   = this.pos.x-(this.w/2),
        rightX  = this.pos.x+(this.w/2),
        topY    = this.pos.y-(this.h/2),
        bottomY = this.pos.y+(this.h/2);

    // field border
    ctx.fillStyle = ex.Color.White.toString();
    ctx.beginPath();
    ctx.moveTo(leftX  - 2*this.yd, topY    - 2*this.yd);
    ctx.lineTo(rightX + 2*this.yd, topY    - 2*this.yd);
    ctx.lineTo(rightX + 2*this.yd, bottomY + 2*this.yd);
    ctx.lineTo(leftX  - 2*this.yd, bottomY + 2*this.yd);
    ctx.closePath(); 
    ctx.fill();

    // field
    ctx.fillStyle = this.fieldColor.toString();
    ctx.beginPath();
    ctx.moveTo(leftX, topY);
    ctx.lineTo(rightX, topY);
    ctx.lineTo(rightX, bottomY);
    ctx.lineTo(leftX, bottomY);
    ctx.closePath(); 
    ctx.fill();

    // top endzone
    ctx.fillStyle = ex.Color.fromHex('003F2D');
    ctx.beginPath();   
    ctx.moveTo(leftX,  topY);
    ctx.lineTo(rightX, topY);
    ctx.lineTo(rightX, topY + (this.h/12));
    ctx.lineTo(leftX,  topY + (this.h/12));
    ctx.closePath(); 
    ctx.fill(); 

    // bottom endzone
    ctx.beginPath();   
    ctx.moveTo(leftX,  bottomY - (this.h/12));
    ctx.lineTo(rightX, bottomY - (this.h/12));
    ctx.lineTo(rightX, bottomY);
    ctx.lineTo(leftX,  bottomY);
    ctx.closePath(); 
    ctx.fill(); 
    

    // yardlines
    ctx.strokeStyle = ex.Color.White.toString();
    for(let i=0;i<11;i++){
      ctx.lineWidth = this.lineWidth;
      let y = topY + ((i+1)*(this.h/12));
      ctx.beginPath();   
      ctx.moveTo(leftX, y);
      ctx.lineTo(rightX, y);
      ctx.closePath(); 
      ctx.stroke(); 

      if(i>0){      
        ctx.lineWidth = this.lineWidth /2;
        y -= this.h/25;
        ctx.beginPath();   
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.closePath(); 
        ctx.stroke();      
      }
    }

    // goalposts
    ctx.fillStyle = ex.Color.Yellow.toString();
    ctx.strokeStyle = ex.Color.Black.toString();
    ctx.lineWidth = .1 * this.game.scale;

    // top stand
    ctx.beginPath();    
    ctx.arc(this.pos.x, topY - (this.yd * 3), .7*this.game.scale, 0, Math.PI * 2)
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 

    // top mast
    ctx.beginPath();   
    ctx.moveTo(this.pos.x-.2 * this.yd, topY - (3*this.yd));
    ctx.lineTo(this.pos.x+.2 * this.yd, topY - (3*this.yd));
    ctx.lineTo(this.pos.x+.2 * this.yd, topY);
    ctx.lineTo(this.pos.x-.2 * this.yd, topY);
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke();

    // top crossbar
    ctx.beginPath();   
    ctx.moveTo(this.pos.x-6.2 * this.yd, topY - (.4*this.yd));
    ctx.lineTo(this.pos.x+6.2 * this.yd, topY - (.4*this.yd));
    ctx.lineTo(this.pos.x+6.2 * this.yd, topY);
    ctx.lineTo(this.pos.x-6.2 * this.yd, topY);
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 
    
    // bottom stand
    ctx.beginPath();    
    ctx.arc(this.pos.x, bottomY + (this.yd * 3), .7*this.game.scale, 0, Math.PI * 2)
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 

    // bottom mast
    ctx.beginPath();   
    ctx.moveTo(this.pos.x-.2 * this.yd, bottomY);
    ctx.lineTo(this.pos.x+.2 * this.yd, bottomY);
    ctx.lineTo(this.pos.x+.2 * this.yd, bottomY + (3*this.yd));
    ctx.lineTo(this.pos.x-.2 * this.yd, bottomY + (3*this.yd));
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke();

    // bottom crossbar
    ctx.beginPath();   
    ctx.moveTo(this.pos.x-6.2 * this.yd, bottomY + (.4*this.yd));
    ctx.lineTo(this.pos.x+6.2 * this.yd, bottomY + (.4*this.yd));
    ctx.lineTo(this.pos.x+6.2 * this.yd, bottomY);
    ctx.lineTo(this.pos.x-6.2 * this.yd, bottomY);
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 
    
    // hashmarks
    ctx.strokeStyle = ex.Color.White.toString();
    ctx.lineWidth = this.lineWidth / 2;
    for(let n=0;n<4;n++){
      let x;
      switch(n){
        case 0: x = leftX + (1 * this.yd); break; // left sideline
        case 1: x = this.pos.x-7.2 * this.yd; break; // left goalpost
        case 2: x = this.pos.x+6.2 * this.yd; break; // right goalpost
        case 3: x = rightX - (2 * this.yd); break; // right sideline
      }
      
      for(let i=0;i<100;i++){
        if(i%10 != 0 && i%5 != 0){
          let y = topY + (this.yd * 10) + (this.yd * i);
          ctx.beginPath();   
          ctx.moveTo(x, y);
          ctx.lineTo(x + (1 * this.yd), y);
          ctx.closePath(); 
          ctx.stroke(); 
        }     
      }
    }

    // labels
    ctx.fillStyle = ex.Color.White.toString();
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.font = this.h*0.04 + "px Clarendon";

    for(let i=0;i<9;i++){    
      let pos = i+1;
      let yPos = pos+1;
      let x = leftX + this.w/8;
      let y = topY + ((pos+1)*(this.h/12));
      //console.log(x, y);
      let num = 10*pos;
      if(num > 50) num = 100-num;    
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(90*Math.PI/180);
      let text = num.toString().split("").join(String.fromCharCode(8202));
      ctx.fillText(text,0,0);
      ctx.restore();
    }

    for(let i=0;i<9;i++){    
      let pos = i+1;
      let yPos = pos+1;
      let x = rightX - this.w/8;
      let y = topY + ((pos+1)*(this.h/12));
      //console.log(x, y);
      let num = 10*pos;
      if(num > 50) num = 100-num;    
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-90*Math.PI/180);
      let text = num.toString().split("").join(String.fromCharCode(8202));
      ctx.fillText(text,0,0);
      ctx.restore();
    }

    
    ctx.restore();


  }

}
