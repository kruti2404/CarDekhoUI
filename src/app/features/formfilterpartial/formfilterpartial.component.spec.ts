import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormfilterpartialComponent } from './formfilterpartial.component';


describe('FormfilterpartialComponent', () => {
  let component: FormfilterpartialComponent;
  let fixture: ComponentFixture<FormfilterpartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormfilterpartialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormfilterpartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
