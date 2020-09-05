import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeDelDocenteComponent } from './mensaje-del-docente.component';

describe('MensajeDelDocenteComponent', () => {
  let component: MensajeDelDocenteComponent;
  let fixture: ComponentFixture<MensajeDelDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeDelDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeDelDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
