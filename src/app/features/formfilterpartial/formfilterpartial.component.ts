import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { MatSliderModule } from '@angular/material/slider';
import { Options } from 'ng5-slider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';
import { SharedSliderModule } from '../../shared/models/shared-slider.module';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { Sort, MatSortModule, SortDirection, } from '@Angular/material/sort'
import { AuthenticationService } from '../../core/services/authentication.service';
import { user } from '../../shared/models/Authentication/User';

@Component({
  standalone: true,
  selector: 'app-formfilterpartial',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    RatingModule,
    MatSliderModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSliderModule,
    RouterLink,
  ],
  templateUrl: './formfilterpartial.component.html',
  styleUrls: ['./formfilterpartial.component.css'],
})
export class FormfilterpartialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  returnUrl: string | [] = '';
  vehicles: any[] = [];
  categories: any[] = [];
  Brands: any[] = [];
  ColoursList: any[] = [];
  selectedCategory?: string;
  value: number = 200000;
  highValue: number = 200000000;
  TotalResult: number = 0;
  PageSize: number = 10;
  PageNumber: number = 0;
  SortColumn: string = '';
  SortDirection: SortDirection = '';
  options: Options = {
    floor: 200000,
    ceil: 200000000
  };

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  services = inject(CardekhoserviceService);

  ngOnInit(): void {
    console.log("OnInit of form filter page ")
    this.form = new FormGroup({
      selectedBrand: new FormControl([]),
      selectedCategory: new FormControl(''),
      Colours: new FormControl([]),
      Rating: new FormControl(''),
      Range: new FormControl([200000, 200000000]),
      Search: new FormControl('')
    });

    
    this.authService.user$.pipe().subscribe({
      next: (user: user | null) => {
        console.log("User in Filter page ", user);
      },
      error(err) {
        console.log("Error is ", err.error);
      },
      complete() {
        console.log("Completed");
      },
    });
    
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    const colours = this.form.get('Colours')?.value ?? [];
    const brands = this.form.get('selectedBrand')?.value ?? [];
    const rating = this.form.get('Rating')?.value ?? '';
    const selectedRange = this.form.get('Range')?.value ?? [200000, 200000000];
    const search = this.form.get('Search')?.value;
    console.log("The search term is ", search);
    this.services
      .filterVehicles(
        this.selectedCategory ?? '',
        brands,
        colours,
        rating,
        selectedRange[0],
        selectedRange[1],
        this.PageSize,
        this.PageNumber + 1,
        search,
        this.SortColumn,
        this.SortDirection
      )
      .subscribe({
        next: (value) => {
          console.log('Vehicles are', value);
          this.vehicles = value.result.vehicles;
          this.categories = value.categories;
          this.Brands = value.brands;
          this.ColoursList = value.colours;
          this.loading = false;
          console.log("Vehicles records are ", value.result.totalPages);
          this.TotalResult = value.result.totalPages;
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

  Pagination(event: PageEvent): void {
    console.log("Pagination");
    console.log("Page Size", event.pageSize);
    console.log("Page Number", event.pageIndex);
    console.log("Page Number", event.length);
    this.PageSize = event.pageSize;
    this.PageNumber = event.pageIndex;
    this.loadData();
  }
  sortData(event: Sort): void {
    console.log("Sorting is happening ");
    console.log("Sort ", event.active);
    if (this.SortColumn == event.active) {
      this.SortDirection = this.SortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.SortDirection = event.direction;
    }
    console.log("Sort ", this.SortDirection);
    this.SortColumn = event.active;
    this.loadData();
  }

}
