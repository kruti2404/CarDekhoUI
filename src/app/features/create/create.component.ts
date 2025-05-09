import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule, ToastModule,],
  providers: [MessageService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  constructor(private service: CardekhoserviceService, private router: Router, private snackBar: MatSnackBar,) { }
  createForm: FormGroup = new FormGroup({});
  colorsList: string[] = [];
  CategoryList: string[] = [];
  BrandsList: string[] = [];


  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      modalyear: new FormControl('', [Validators.required, Validators.min(1800), Validators.max(2025)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200000000)]),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
      selectedBrand: new FormControl('', Validators.required),
      selectedCategory: new FormControl('', Validators.required),
      selectedColours: new FormControl([], Validators.required),
    });

    this.Data();
  }

  Data() {

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



  }

  submitForm() {
    if (this.createForm.valid) {
      console.log("The form is submitted");
      const name = this.createForm.get('name')?.value;
      const description = this.createForm.get('description')?.value;
      const modalyear = this.createForm.get('modalyear')?.value;
      const Price = this.createForm.get('price')?.value;
      const rating = this.createForm.get('rating')?.value;
      const quantity = this.createForm.get('quantity')?.value;
      const colours = this.createForm.get('selectedColours')?.value;
      const brands = this.createForm.get('selectedBrand')?.value;
      const categories = this.createForm.get('selectedCategory')?.value;

      console.log(name, " ", rating, " ", description, " ", modalyear, " ", Price, " ", quantity, " ", colours, " ", brands, " ", categories);

      var formdata = new FormData();
      formdata.append('Name', name);
      formdata.append('Description', description);
      formdata.append('ModalYear', modalyear);
      formdata.append('Price', Price);
      formdata.append('Rating', rating);
      formdata.append('Quantity', quantity);
      formdata.append('Colours', colours);
      formdata.append('Brand', brands);
      formdata.append('Category', categories);


      console.log("Starting post request");

      this.service.sendReq(formdata).subscribe({
        next: (value) => {
          console.log("The data is ", value);
          // this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Product added!' });
          this.snackBar.open('Vehicle added ', 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
          // this.router.navigate(['/Filters']);
        },
        error(err) {
          console.log("Error while executing the post request ", err);
        },
        complete() {
          console.log("Completed the post request ");
        },
      });



    } else {
      console.log("Form is invalid");
      this.createForm.markAllAsTouched(); // shows all validation errors
    }
  }
}
