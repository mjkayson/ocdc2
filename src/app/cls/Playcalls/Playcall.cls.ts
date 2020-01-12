import { PlaycallElement } from './BaseClasses.cls';
import { PlayType } from '../Playcalls/BaseClasses.cls';



export class Playcall {  
  
  //personnel:PersonnelPackage = new PersonnelPackage();

  personnelOptions:any = [];
  formationOptions:any = []

  options;
  phase:number = 0;
  currentPhase;
  personnel;
  formation;
  playType:PlayType;
  ready:boolean = false;

  players = [];

  constructor(){}

  setPersonnel(personnel){
    this.personnel = personnel;
  } 
  
  nextPhase(){
    this.phase++;
  }

  getPlayers(){
    return this.players;
  }
  
  text(){
    return 'override me';
  }

  setPlayType(type){
    this.playType = type;
  }

  getPlayType(){
    return this.playType;
  }

  getPlayersByPosition(pos){
    let p = [];
    this.players.forEach(player=>{
      if(player.pos == pos){
        p.push(player);
      }
    });
    return p;
  }

  getPlayersByType(type){
    let p = [];
    this.players.forEach(player=>{
      if(player.type == type){
        p.push(player);
      }
    });
    return p;
  }

}

