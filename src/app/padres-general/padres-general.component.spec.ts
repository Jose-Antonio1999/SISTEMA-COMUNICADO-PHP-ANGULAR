import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadresGeneralComponent } from './padres-general.component';

describe('PadresGeneralComponent', () => {
  let component: PadresGeneralComponent;
  let fixture: ComponentFixture<PadresGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadresGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadresGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
