
export class Siri {

  
  public static getRandomNumber(min, max, doNotRound?):number{
    if(min < 0){
      
    }
    let rand = Math.random() * (max - min + 1) + min;
    return doNotRound? rand : Math.floor(rand);
  }

  public static getClock(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return Siri.strPadLeft(minutes,'0',2) + ':' + Siri.strPadLeft(seconds,'0',2);

  }

  public static strPadLeft(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }


}





