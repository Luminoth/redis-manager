import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomViewComponent } from './bottom-view.component';

describe('BottomViewComponent', () => {
  let component: BottomViewComponent;
  let fixture: ComponentFixture<BottomViewComponent>;

  beforeEach(waitForAsync(() => {
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
