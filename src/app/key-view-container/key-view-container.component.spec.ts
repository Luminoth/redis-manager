import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyViewContainerComponent } from './key-view-container.component';

describe('KeyViewContainerComponent', () => {
  let component: KeyViewContainerComponent;
  let fixture: ComponentFixture<KeyViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
