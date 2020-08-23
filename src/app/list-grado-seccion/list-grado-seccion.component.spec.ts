import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGradoSeccionComponent } from './list-grado-seccion.component';

describe('ListGradoSeccionComponent', () => {
  let component: ListGradoSeccionComponent;
  let fixture: ComponentFixture<ListGradoSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGradoSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGradoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
