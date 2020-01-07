export class Down_4Base {
  name = "Base";
  // technique:number, inside:boolean, stance:number, weak:boolean
  alignment = [
    { technique: 3 }, // ST
    { technique: 7 }, // SE
    { technique: 2, inside: true, weak: true }, // WT
    { technique: 5, weak: true } // WE
  ]
}

export class Box_3Base {
  name = "Base";
  // gap:string, shade:string, weak:boolean, depth:number
  alignment = [
    { gap: 'A', depth: 4 }, // Mike
    { gap: 'C', depth: 3 }, // Sam
    { gap: 'D', weak: true, depth: 2 } // Will
  ]
}

export class Secondary_4Base {
  name = "Base";
  // type: string, priority:string || x:number, weak:boolean, shade:string, depth:number
  alignment = [
    { type: 'mirror',   priority: 'outside', depth: 6 }, // CB
    { type: 'mirror',   priority: 'outside', depth: 6 }, // CB
    { type: 'mirror',   priority: 'inside',  depth: 5, shade: 'outside' }, // SS, shaded outside innermost receiver
    { type: 'position', x: 3, depth: 12 } // FS, 3 yards to the strongside
  ]
}