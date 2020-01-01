import { Component, ViewChild, AfterContentInit } from '@angular/core';

var Highcharts = require('highcharts');

@Component({
  selector: 'dev-tools',
  templateUrl: './dev-tools.component.html',
  styleUrls: ['./dev-tools.component.scss'],
})
export class DevToolsComponent implements AfterContentInit {

  @ViewChild('chart', {static: false}) chart:any;
  scatter;
  results:any = {
    loss: 0,
    line: 0,
    low: 0,
    pos: 0,
    first: 0,
    long: 0
  };

  chartData:any = [];
  dataSet:any = [];

  constructor() { }

  ngAfterContentInit() {
    setTimeout(()=>this.drawChart(), 250);
    setInterval(()=>this.setChartData(), 1000);
  }

  getChartData(){
    return this.chartData;
  }

  setChartData(){
    this.chartData = [];
    for(var i=0;i<40;i++){
      this.chartData.push({ x: i-10, y: this.getYValue(i-10)});
    }
    //console.log(this.chartData, this.dataSet);
    this.scatter.series[0].setData(this.chartData);
  }

  getYValue(x){
    let count = 0;
    for(var j=0;j<this.dataSet.length;j++){
      if(this.dataSet[j] == x) count++;
    }
    //console.log(count, this.dataSet.length);
    return count/this.dataSet.length * 100;

  }


  drawChart(){
    this.scatter = Highcharts.chart(this.chart.nativeElement, {
      chart: {
        margin: [10,0,20,35],
        height: 260
      },
      credits: { enabled: false },
      tooltip: { enabled: false },
      legend:  { enabled: false },
      title:   { text: null },
      xAxis: {
        min: -10,
        max: 30,
        gridLineWidth: 1,
        startOnTick: true,
        tickLength: 5,
        tickPositions: [-9,-7,-5,-3,-1,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29]
      },
      yAxis: {
        title: null,
        min: 0,
        max: 16,
        tickInterval: 2

      },
      series: [{
          type: 'line',
          name: 'Distribution',
          data: [],
          marker: {
              radius: 1
          }
      }]
    });
  }

  addResult(gain){
    this.dataSet.push(gain);

    if(gain < -1){
      this.results.loss++;
    } else if(gain < 1){
      this.results.line++;
    } else if(gain < 4){
      this.results.low++;
    } else if(gain < 8){
      this.results.pos++;
    } else if(gain < 11){
      this.results.first++;
    } else {
      this.results.long++;
    } 
  }

  update(dataPoint){   
    
    let gain = Math.round(dataPoint[0]); 
    this.addResult(gain);
    //this.setChartData();
    //this.scatter.series[0].addPoint(dataPoint[0], true, false, false);
  }

  /*
  update(dataPoint){    
    this.addResult(dataPoint[0]);
    let point = {
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
      x: dataPoint[0],
      y: dataPoint[1]
    };
    this.scatter.series[0].addPoint(point, true, false, false);
  }
  */

}
