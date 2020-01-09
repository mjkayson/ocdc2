import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InPlayGridPage } from './in-play-grid.page';

describe('InPlayGridPage', () => {
  let component: InPlayGridPage;
  let fixture: ComponentFixture<InPlayGridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InPlayGridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InPlayGridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
