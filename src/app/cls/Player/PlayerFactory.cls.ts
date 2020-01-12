import { Player } from './Player.cls';

export class PlayerFactory {

  static getPlayer(pos){
    return new Player(pos);
  }
    

}

