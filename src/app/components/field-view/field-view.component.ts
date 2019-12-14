import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'field-view',
  templateUrl: './field-view.component.html',
  styleUrls: ['./field-view.component.scss'],
})
export class FieldViewComponent implements AfterContentInit {

  @Input() game;

  constructor() { }


  ngAfterContentInit() {}

}
