import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPrediccionComponent } from './generar-prediccion.component';

describe('GenerarPrediccionComponent', () => {
  let component: GenerarPrediccionComponent;
  let fixture: ComponentFixture<GenerarPrediccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarPrediccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarPrediccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
