import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomViewComponent } from './bottom-view.component';

describe('BottomViewComponent', () => {
  let component: BottomViewComponent;
  let fixture: ComponentFixture<BottomViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
