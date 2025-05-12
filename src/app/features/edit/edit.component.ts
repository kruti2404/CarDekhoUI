import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Removed Inject
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';
import { Car } from '../../shared/models/car.module'; // Assumed this is the model for SUBMITTING data
// Define an interface for the structure returned by getVehicleDetails if it's different from Car
// If Car model itself contains modelYear, brandName etc., this separate interface isn't strictly needed,
// but the Car model must be consistent.
interface VehicleDetailsResponse {
  id: string | number;
  name: string;
  description: string;
  modelYear: string | number; // Note: 'modelYear' might differ from 'modalyear' in Car model
  price: number;
  rating: number;
  quantity: number;
  brandName: string;      // Note: 'brandName' might differ from 'brand' in Car model
  categoryName: string;   // Note: 'categoryName' might differ from 'category' in Car model
  coloursNames: string;   // Note: 'coloursNames' (string) might differ from 'colours' (string[]) in Car model
}


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
    name: new FormControl('', Validators.required), // Added Validators.required here as well for consistency
    description: new FormControl('', Validators.required), // Added Validators.required
    modalyear: new FormControl('', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear() + 1)]), // Dynamic max year
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200000000)]),
    rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
    selectedBrand: new FormControl('', Validators.required),
    selectedCategory: new FormControl('', Validators.required),
    selectedColours: new FormControl([], Validators.required),
  });
  colorsList: any[] = [];
  CategoryList: any[] = [];
  BrandsList: any[] = [];
  Id: string = ''; // Vehicle ID to be edited

  ngOnInit(): void {
    this.loadDropdownData(); // Renamed for clarity
    this.loadVehicleData();  // Renamed for clarity
  }

  loadDropdownData(): void {
    this.service.loadInitialFilterData().subscribe({ // Corrected method name
      next: (value) => { // Assuming InitialLoadData has these properties
        this.colorsList = value.colours;
        this.BrandsList = value.brands;
        this.CategoryList = value.categories;
        console.log("Dropdown data loaded:", value);
      },
      error: (error) => {
        console.error("Error occurred while fetching dropdown lists: ", error);
        this.snackbar.open('Error loading filter options', 'Close', { duration: 3000 });
      }
    });
  }

  loadVehicleData(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
        console.error("No ID found in route parameters");
        this.router.navigate(['/some-error-page-or-list']); // Handle missing ID
        return;
    }
    const id = Number(idParam);

    // Assuming getVehicleDetails now returns Observable<VehicleDetailsResponse>
    // If it returns Observable<Car> and Car model matches data.modelYear etc., adjust type accordingly
    this.service.getVehicleDetails(id).subscribe({
      next: (data: VehicleDetailsResponse) => { // Corrected method name and using VehicleDetailsResponse
        this.Id = String(data.id); // Ensure Id is a string

        // Re-initialize or patch the form with fetched data
        this.editform.setValue({ // Use setValue if all controls are being set
          name: data.name,
          description: data.description,
          modalyear: data.modelYear, // Matches VehicleDetailsResponse
          price: data.price,
          rating: data.rating,
          quantity: data.quantity,
          selectedBrand: data.brandName, // Matches VehicleDetailsResponse
          selectedCategory: data.categoryName, // Matches VehicleDetailsResponse
          selectedColours: data.coloursNames ? data.coloursNames.split(',').map(c => c.trim()) : [], // Matches VehicleDetailsResponse
        });
        console.log("Vehicle details fetched and form populated:", data);
      },
      error: (err) => {
        console.error("Error fetching vehicle details: ", err);
        this.snackbar.open('Error fetching vehicle data', 'Close', { duration: 3000 });
        // Optionally navigate away or show an error message
      }
    });
  }

  submitForm() {
    console.log("Submit button clicked");
    if (this.editform.valid) {
      // Construct the Car object as expected by the backend API for update
      // This structure should match your `Car` model from `car.module.ts`
      const carPayload: Car = {
        // id: this.Id, // ID is often sent in URL or as a separate FormData field, not in the main payload object
        name: this.editform.get('name')?.value,
        description: this.editform.get('description')?.value,
        modalyear: this.editform.get('modalyear')?.value,
        price: Number(this.editform.get('price')?.value), // Ensure numeric types
        rating: Number(this.editform.get('rating')?.value), // Ensure numeric types
        quantity: Number(this.editform.get('quantity')?.value), // Ensure numeric types
        brand: this.editform.get('selectedBrand')?.value,
        category: this.editform.get('selectedCategory')?.value,
        colours: this.editform.get('selectedColours')?.value // This should be string[]
      };

      console.log("Prepared car object for submission:", carPayload);

      const formdata = new FormData();
      formdata.append("Id", this.Id); // Backend expects 'Id' in FormData

      // Append other car properties to FormData
      // Ensure keys match what the backend expects
      Object.entries(carPayload).forEach(([key, value]) => {
        if (key === 'id') return; // Skip 'id' if already added or not part of this payload structure

        if (Array.isArray(value)) {
          formdata.append(key, value.join(',')); // 'colours' will become a comma-separated string
        } else if (value !== null && value !== undefined) {
          formdata.append(key, String(value));
        }
      });

      console.log("FormData to be sent:", formdata);

      this.service.updateVehicle(formdata).subscribe({ // Corrected method name
        next: (response) => {
          console.log("Vehicle update response: ", response);
          this.snackbar.open('Vehicle Edited Successfully!', 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar', 'snackbar-success'] // Example custom classes
          });
          this.router.navigate([`/Details/${this.Id}`]); // Navigate to details page
        },
        error: (err) => {
          console.error("Error while updating vehicle: ", err);
          this.snackbar.open('Error updating vehicle. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar', 'snackbar-error'] // Example custom classes
          });
        }
      });
    } else {
      console.warn("Form is invalid. Marking all fields as touched.");
      this.editform.markAllAsTouched(); // Show validation errors
      this.snackbar.open('Please correct the errors in the form.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar', 'snackbar-warning']
      });
    }
  }
}