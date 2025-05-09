import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { MatSliderModule } from '@angular/material/slider';
import { Options } from 'ng5-slider';
import { RouterLink } from '@angular/router';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';
import { SharedSliderModule } from '../../shared/models/shared-slider.module';


@Component({
  standalone:true,
  selector: 'app-formfilterpartial',
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    RatingModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSliderModule,
    RouterLink
    ],
  templateUrl: './formfilterpartial.component.html',
  styleUrls: ['./formfilterpartial.component.css'],
})
export class FormfilterpartialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = false;

  vehicles: any[] = [];
  categories: any[] = [];
  Brands: any[] = [];
  ColoursList: any[] = [];
  selectedCategory?: string;

  value: number = 200000;
  highValue: number = 200000000;

  options: Options = {
    floor: 200000,
    ceil: 200000000
  };

  services = inject(CardekhoserviceService);

  ngOnInit(): void {
    this.form = new FormGroup({
      selectedBrand: new FormControl([]),
      selectedCategory: new FormControl(''),
      Colours: new FormControl([]),
      Rating: new FormControl(''),
      Range: new FormControl([200000, 200000000]),
    });

    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    const colours = this.form.get('Colours')?.value ?? [];
    const brands = this.form.get('selectedBrand')?.value ?? [];
    const rating = this.form.get('Rating')?.value ?? '';
    const selectedRange = this.form.get('Range')?.value ?? [200000, 200000000];

    this.services
      .Filter(
        this.selectedCategory ?? '',
        brands,
        colours,
        rating,
        selectedRange[0],
        selectedRange[1]
      )
      .subscribe({
        next: (value) => {
          console.log('Vehicles are', value);
          this.vehicles = value.result.vehicles;
          this.categories = value.categories;
          this.Brands = value.brands;
          this.ColoursList = value.colours;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching vehicle details:', error);
          this.loading = false;
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }

  applyFilters(): void {
    this.selectedCategory = this.form.get('selectedCategory')?.value;
    const selectedBrand = this.form.get('selectedBrand')?.value;
    const selectedColours = this.form.get('Colours')?.value;
    const selectedRating = this.form.get('Rating')?.value;
    const selectedRange = this.form.get('Range')?.value;

    console.log('Selected Category:', this.selectedCategory);
    console.log('Selected Brand:', selectedBrand);
    console.log('Selected Colours:', selectedColours);
    console.log('Selected Rating:', selectedRating);
    console.log('Selected Price Range:', selectedRange);

    this.loadData();
  }
}
