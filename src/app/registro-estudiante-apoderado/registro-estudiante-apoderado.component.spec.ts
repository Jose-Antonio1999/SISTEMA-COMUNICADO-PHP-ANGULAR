import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstudianteApoderadoComponent } from './registro-estudiante-apoderado.component';

describe('RegistroEstudianteApoderadoComponent', () => {
  let component: RegistroEstudianteApoderadoComponent;
  let fixture: ComponentFixture<RegistroEstudianteApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEstudianteApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEstudianteApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
