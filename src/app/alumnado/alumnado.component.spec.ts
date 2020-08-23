import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnadoComponent } from './alumnado.component';

describe('AlumnadoComponent', () => {
  let component: AlumnadoComponent;
  let fixture: ComponentFixture<AlumnadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
