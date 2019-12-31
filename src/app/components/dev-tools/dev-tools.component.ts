import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

var Highcharts = require('highcharts');
require('highcharts/modules/histogram-bellcurve')(Highcharts);

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

  constructor() { }

  ngAfterContentInit() {
    setTimeout(()=>this.drawChart(), 250);
  }

  /*
  drawChart(){
    this.scatter = Highcharts.chart(this.chart.nativeElement, {
      chart: {
        margin: [0,0,20,0],
        height: 400
      },
      credits: { enabled: false },
      tooltip: { enabled: false },
      legend:  { enabled: false },
      title:   { text: null },
      series: [{
          type: 'scatter',
          name: 'Distribution',
          data: [],
          marker: {
              radius: 1
          }
      }]
    });
  }
  */  


  drawChart(){
    var data = [-5,-3,-2,-1,-1,-1,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,5,5,5,7,11,16];

    this.scatter = Highcharts.chart(this.chart.nativeElement, {
      chart: {
        type: 'histogram',
        margin: [0,0,20,35],
        height: 400
      },
      credits: { enabled: false },
      tooltip: { enabled: false },
      legend:  { enabled: false },
      title:   { text: null },
      xAxis: [{
        title: { text: 'Data' },
        alignTicks: false
      }, {
          title: { text: 'Histogram' },
          alignTicks: false,
          opposite: true
      }],

      yAxis: [{
          title: { text: 'Data' }
      }, {
          title: { text: 'Histogram' },
          opposite: true
      }],

      series: [{
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 's1',
          zIndex: -1
      }, {
          name: 'Data',
          type: 'scatter',
          data: data,
          id: 's1',
          marker: {
              radius: 1.5
          }
      }]
    });
  }  

  addResult(gain){
    
    gain = Math.round(gain);
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
    this.addResult(dataPoint[0]);
    console.log(this.scatter.series[0]);
    this.scatter.series[0].addPoint(dataPoint[0], true, false, false);
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
