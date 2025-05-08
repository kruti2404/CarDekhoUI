import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVehicleByIdComponent } from './get-vehicle-by-id.component';

describe('GetVehicleByIdComponent', () => {
  let component: GetVehicleByIdComponent;
  let fixture: ComponentFixture<GetVehicleByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetVehicleByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetVehicleByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
