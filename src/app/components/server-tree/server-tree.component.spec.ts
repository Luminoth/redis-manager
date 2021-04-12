import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServerTreeComponent } from './server-tree.component';

describe('ServerTreeComponent', () => {
  let component: ServerTreeComponent;
  let fixture: ComponentFixture<ServerTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
