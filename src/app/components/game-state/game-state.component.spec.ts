import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameStateComponent } from './game-state.component';

describe('GameStateComponent', () => {
  let component: GameStateComponent;
  let fixture: ComponentFixture<GameStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
