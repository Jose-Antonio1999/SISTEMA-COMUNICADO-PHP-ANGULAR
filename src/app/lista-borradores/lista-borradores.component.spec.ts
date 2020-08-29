import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBorradoresComponent } from './lista-borradores.component';

describe('ListaBorradoresComponent', () => {
  let component: ListaBorradoresComponent;
  let fixture: ComponentFixture<ListaBorradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBorradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBorradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
