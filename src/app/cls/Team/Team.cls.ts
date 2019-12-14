

export class Team {


  constructor(data = null){
    
    for(var i in data){
      this[i] = data[i];
    }

   
  }

}





