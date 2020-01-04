export class Config {
  
  public static engine = {
    runMin: 10
  }

  public static runData = {
    transfer: {
      min: 200,
      max: 550,
      endsOn: 0
    },
    line1: {
      min: 100,
      max: 200,
      endsOn: 3
    },
    line2: {
      min: 100,
      max: 250,
      endsOn: 3
    },
    location1: {
      min: 100,
      max: 250,
      endsOn: 40
    },
    location2: {
      min: 100,
      max: 300,
      endsOn: 40
    },
    box1: {
      min: 100,
      max: 500,
      endsOn: 50
    },
    box2: {
      min: 100,
      max: 500,
      endsOn: 50
    },
    secondary: {
      min: 300,
      max: 900,
      endsOn: 60
    },
    break: {
      min: 300,
      max: 4000,
      endsOn: 100
    }
  }

}
