import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-get-vehicle-by-id',
  imports: [ FormsModule],
  templateUrl: './get-vehicle-by-id.component.html',
  styleUrl: './get-vehicle-by-id.component.css'
})
export class GetVehicleByIdComponent {
  Id?: number;
  
  
  constructor(private router: Router) { }
  Details: any = () => {
    console.log("Console the value ", this.Id);
    this.router.navigate(['/admin/details', this.Id]);
  }
}

