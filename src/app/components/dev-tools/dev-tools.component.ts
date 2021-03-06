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
  currentSeries:number = 0;

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
    this.scatter.series[this.currentSeries].setData(this.chartData);
  }

  getYValue(x){
    let count = 0;
    for(var j=0;j<this.dataSet.length;j++){
      if(this.dataSet[j] == x) count++;
    }
    //console.log(count, this.dataSet.length);
    return count/this.dataSet.length * 100;

  }

  newSeries(){
    this.dataSet = [];
    this.scatter.addSeries({ data: [] });
    this.currentSeries++;
  }


  drawChart(){
    this.scatter = Highcharts.chart(this.chart.nativeElement, {
      chart: {
        type: 'area',
        margin: [10,0,20,35],
        height: 200
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
        tickPositions: [-9,-7,-5,-3,-1,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29],
        plotLines: [{
          color: '#454545',
          width: 1,
          value: 0,
          zIndex:999
      }]
      },
      yAxis: {
        title: null,
        min: 0,
        max: 30,
        tickInterval: 2
      },
      plotOptions: {
        area: {
          fillOpacity: .25
        },
        series: {
          marker: {
              enabled: false
          }
        }
      },
      series: [{
        data: []
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
    let gain = Math.round(dataPoint); 
    this.addResult(gain);
  }


}
