
export class Player {

  pos:string;
  letter:string;
  type:string;
  x:number = 0;
  y:number = 0;
  alignment;
  assignment;

  constructor(pos){
    this.pos = pos.pos;
    this.type = pos.type;
  }

  setAlignment(alignment){
    //console.log('setting player alignment', alignment);
    this.alignment = alignment;
    this.x = alignment.x;
    this.y = alignment.y;
  }

  hasAlignment(){
    return this.alignment != null;
  }

  getAlignment(){
    return this.alignment;
  }

  setAssignment(assignment){
    this.assignment = assignment;
  }

  hasAssignment(){
    return this.assignment != null;
  }

  getAssignment(){
    return this.assignment;
  }

}
