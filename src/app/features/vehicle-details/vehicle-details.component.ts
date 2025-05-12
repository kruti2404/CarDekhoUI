import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardekhoserviceService } from '../../core/services/cardekhoservice.service';

@Component({
  standalone: true,
  selector: 'app-vehicle-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit{
  vehicle: any = null;
  vehicleId: number | null = null;

  private route = inject(ActivatedRoute);
  private service = inject(CardekhoserviceService);
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vehicleId = +id; 
      this.fetchVehicleDetails(this.vehicleId);
    }
  }
  fetchVehicleDetails(id: number): void {
    this.service.getVehicleDetails(id).subscribe(
      (data) => {
        this.vehicle = data;
      },
      (error) => {
        console.error('Error fetching vehicle details:', error);
      }
    );
  }
}
