import { PlaycallElement } from './BaseClasses.cls';

export class UnderCenter extends PlaycallElement {
  public name:string = 'Under Center'; 
  public doNotShowInPlaycall:boolean = true; 
  public id:number = 1;
  public qb_depth = 0;
}
/*
export class Shotgun extends PlaycallElement {
  public name:string = 'Gun';
  public id:number = 2;
  public qb_depth = 4;     
}
*/
  