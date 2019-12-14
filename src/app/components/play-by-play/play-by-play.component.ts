import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'play-by-play',
  templateUrl: './play-by-play.component.html',
  styleUrls: ['./play-by-play.component.scss'],
})
export class PlayByPlayComponent implements AfterContentInit {

  @Input() game;
  
  constructor() { }

  ngAfterContentInit() {}

}
