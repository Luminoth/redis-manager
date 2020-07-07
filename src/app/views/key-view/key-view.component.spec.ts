import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyViewComponent } from './key-view.component';

describe('KeyViewComponent', () => {
  let component: KeyViewComponent;
  let fixture: ComponentFixture<KeyViewComponent>;

  beforeEach(async(() => {
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
