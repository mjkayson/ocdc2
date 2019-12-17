import { Component, Input, AfterContentInit } from '@angular/core';

import * as ex from 'excalibur';
import { Field } from '../../excalibur/field';


@Component({
  selector: 'field-view',
  templateUrl: './field-view.component.html',
  styleUrls: ['./field-view.component.scss'],
})
export class FieldViewComponent implements AfterContentInit {

  @Input() game;
  engine;
  field;
  

  constructor() { }


  ngAfterContentInit() {
    setTimeout(()=>this.init(),200);
  }

  init(){
    this.engine = new ex.Engine({
      canvasElementId: 'game',
      displayMode: ex.DisplayMode.Container,
      pointerScope: ex.Input.PointerScope.Canvas,
        backgroundColor: ex.Color.fromRGB(25,111,12,1)
    });
    //this.field = new Field();
    //this.engine.add(this.field);
    this.engine.start();
    var paddle = new ex.Actor(150, this.engine.drawHeight - 40, 50, 5);
    paddle.color = ex.Color.Chartreuse;
    paddle.body.collider.type  = ex.CollisionType.Fixed;
    this.engine.add(paddle);
    this.engine.input.pointers.primary.on('move', function(evt) {
      paddle.pos.x = evt.target.lastWorldPos.x;
      paddle.pos.y = evt.target.lastWorldPos.y;
    })
  }

}
