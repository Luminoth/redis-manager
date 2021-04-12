import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopViewComponent } from './top-view.component';

describe('TopViewComponent', () => {
  let component: TopViewComponent;
  let fixture: ComponentFixture<TopViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TopViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
