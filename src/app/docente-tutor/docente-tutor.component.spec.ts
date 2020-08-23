import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteTutorComponent } from './docente-tutor.component';

describe('DocenteTutorComponent', () => {
  let component: DocenteTutorComponent;
  let fixture: ComponentFixture<DocenteTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
