import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QueryImagePage } from './query-image.page';

describe('QueryImagePage', () => {
  let component: QueryImagePage;
  let fixture: ComponentFixture<QueryImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QueryImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
