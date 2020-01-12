import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LineGridComponent } from './line-grid.component';

describe('LineGridComponent', () => {
  let component: LineGridComponent;
  let fixture: ComponentFixture<LineGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineGridComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
