
export class Siri {

  
  public static getRandomNumber(min, max, doNotRound?):number{
    if(min < 0){
      
    }
    let rand = Math.random() * (max - min + 1) + min;
    return doNotRound? rand : Math.floor(rand);
  }


}





