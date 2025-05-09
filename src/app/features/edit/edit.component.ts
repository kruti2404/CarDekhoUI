import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';
import { Car } from '../../shared/models/car.module';

@Component({
  standalone: true,
  selector: 'app-edit',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, private service: CardekhoserviceService, private snackbar: MatSnackBar) { }

  editform: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    modalyear: new FormControl(''),
    price: new FormControl(''),
    rating: new FormControl(''),
    quantity: new FormControl(''),
    selectedBrand: new FormControl(''),
    selectedCategory: new FormControl(''),
    selectedColours: new FormControl([], Validators.required),
  });
  colorsList: string[] = [];
  CategoryList: string[] = [];
  BrandsList: string[] = [];
  Id: string = '';
  ngOnInit(): void {

    this.loadData();


  }

  submitForm() {
    console.log("Submitted");

    if (this.editform.valid) {
      const car: Car = {
        name: this.editform.get('name')?.value,
        description: this.editform.get('description')?.value,
        modalyear: this.editform.get('modalyear')?.value,
        price: this.editform.get('price')?.value,
        rating: this.editform.get('rating')?.value,
        quantity: this.editform.get('quantity')?.value,
        brand: this.editform.get('selectedBrand')?.value,
        category: this.editform.get('selectedCategory')?.value,
        colours: this.editform.get('selectedColours')?.value
      };

      console.log("Prepared car object:", car);
      const formdata = new FormData();
      formdata.append("Id", this.Id)
      Object.entries(car).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formdata.append(key, value.join(','));
        } else {
          formdata.append(key, value as string);
        }
      });

      this.service.sendEditReq(formdata).subscribe({
        next: (value) => {
          console.log("The data is ", value);

          this.snackbar.open('Vehicle Edited ', 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
          this.router.navigate([`/Details/${this.Id}`]);
        },
        error(err) {
          console.log("Error while executing the post request ", err);
        },
        complete() {
          console.log("Completed the post request ");
        },
      });


    }
    else {
      console.log("Form is invalid");
      this.editform.markAllAsTouched(); // shows all validation errors
    }

  }

  loadData() {
    this.service.loadData().subscribe(
      {
        next: (value: any) => {
          console.log(value);
          console.log(value.colorList);
          this.colorsList = value.colorList;
          this.BrandsList = value.brandslist;
          this.CategoryList = value.categorylist;
        },
        error: (error: any) => {
          console.log("Error ocured while fetching the list ", error);
        },
        complete() {
          console.log("Completed ");
        },
      }
    );

    const id = Number(this.route.snapshot.paramMap.get('id'));


    this.service.Getdetails(id).subscribe({
      next: (data) => {
        console.log("The details fetch is ", typeof (data.id));
        this.Id = data.id;

        this.editform = new FormGroup({
          name: new FormControl(data.name, Validators.required),
          description: new FormControl(data.description, Validators.required),
          modalyear: new FormControl(data.modelYear, [Validators.required, Validators.min(1800), Validators.max(2025)]),
          price: new FormControl(data.price, [Validators.required, Validators.min(0), Validators.max(200000000)]),
          rating: new FormControl(data.rating, [Validators.required, Validators.min(0), Validators.max(5)]),
          quantity: new FormControl(data.quantity, [Validators.required, Validators.min(0), Validators.max(1000)]),
          selectedBrand: new FormControl(data.brandName, Validators.required),
          selectedCategory: new FormControl(data.categoryName, Validators.required),
          selectedColours: new FormControl(String(data.coloursNames).split(',').map(c => c.trim()), Validators.required),
        });
        console.log("the data is ", data.name);
      },
      error(err) {
        console.log("Error fetching vehicle details ", err);
      },
      complete() {
        console.log("Completed fetching vehicle details");
      },
    });
  }


}
