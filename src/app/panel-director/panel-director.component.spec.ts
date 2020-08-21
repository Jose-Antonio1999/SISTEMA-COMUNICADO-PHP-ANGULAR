import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDirectorComponent } from './panel-director.component';

describe('PanelDirectorComponent', () => {
  let component: PanelDirectorComponent;
  let fixture: ComponentFixture<PanelDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
