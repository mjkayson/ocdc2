 
export class DefensiveShift_Base {
    public name:string = 'Base';
    strongside = 0;
    weakside = 0;
    inside = 0;
    outside = 0;
}

export class DefensiveShift_Over extends DefensiveShift_Base {
    public name:string = 'Over';
    strongside = 7;
    weakside = -7;
}

export class DefensiveShift_Under extends DefensiveShift_Base {
    public name:string = 'Under'; 
    strongside = -7;
    weakside = 7;
}

export class DefensiveShift_Split extends DefensiveShift_Base {
    public name:string = 'Split';
    outsideside = 7;
    inside = -7;
}

export class DefensiveShift_Tight extends DefensiveShift_Base {
    public name:string = 'Tight';
    outsideside = -7;
    inside = 7; 
}

