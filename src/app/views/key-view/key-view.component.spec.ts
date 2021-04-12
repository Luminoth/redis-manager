import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeyViewComponent } from './key-view.component';

describe('KeyViewComponent', () => {
  let component: KeyViewComponent;
  let fixture: ComponentFixture<KeyViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
