// src/app/core/services/cardekhoservice.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Car } from '../../shared/models/car.module'; // Used for Add/Update payloads
import { FilterApiResponse, InitialLoadData, VehicleMutationResponse } from '../../shared/models/FilterCriteria.module';

// Define this interface if your API returns this structure for vehicle details
// Or ensure your Car model in car.module.ts matches this if you want to use Observable<Car>
export interface VehicleDetailsResponse {
  id: string | number;
  name: string;
  description: string;
  modelYear: string | number;
  price: number;
  rating: number;
  quantity: number;
  brandName: string;
  categoryName: string;
  coloursNames: string; // Comma-separated string
}


@Injectable({
  providedIn: 'root'
})
export class CardekhoserviceService {

  private apiUrl = environment.apiurls;

  constructor(private http: HttpClient) { }

  /**
   * Fetches details for a specific vehicle.
   * @param id The ID of the vehicle.
   * @returns Observable<VehicleDetailsResponse> (or Observable<Car> if Car model matches the response structure)
   */
  public getVehicleDetails(id: number): Observable<VehicleDetailsResponse> { // Adjusted return type
    return this.http.get<VehicleDetailsResponse>(`${this.apiUrl}/vehicles/GetVehicles/${id}`);
  }

  /**
   * Loads initial data needed for filters (categories, brands, colours).
   * @returns Observable<InitialLoadData>
   */
  public loadInitialFilterData(): Observable<InitialLoadData> {
    return this.http.get<InitialLoadData>(`${this.apiUrl}/Home/loadData`);
  }

  /**
   * Adds a new vehicle.
   * @param formData Vehicle data including potential file uploads.
   * @returns Observable<VehicleMutationResponse>
   */
  public addVehicle(formData: FormData): Observable<VehicleMutationResponse> {
    console.log('Adding vehicle via service:', formData);
    return this.http.post<VehicleMutationResponse>(`${this.apiUrl}/Home/AddVehicle`, formData);
  }

  /**
   * Edits an existing vehicle.
   * @param formData Vehicle data including potential file uploads. ID should be part of FormData.
   * @returns Observable<VehicleMutationResponse>
   */
  public updateVehicle(formData: FormData): Observable<VehicleMutationResponse> {
    console.log('Updating vehicle via service:', formData);
    return this.http.post<VehicleMutationResponse>(`${this.apiUrl}/Home/Editvehicle`, formData);
  }

  /**
   * Filters vehicles based on provided criteria.
   * (Content of this method remains the same as in your provided code)
   * @returns Observable<FilterApiResponse>
   */
  public filterVehicles(
    category: string | null,
    brands: string[],
    colours: string[],
    rating: number | string | null,
    minPrice: number,
    maxPrice: number,
    pageSize: number,
    pageNumber: number,
    searchTerm: string | null,
    sortColumn: string | null,
    sortDirection: 'asc' | 'desc' | '' | null
    ): Observable<FilterApiResponse> {

    let params = new HttpParams()
      .set("MinPrice", minPrice.toString())
      .set("MaxPrice", maxPrice.toString())
      .set("PageSize", pageSize.toString())
      .set("PageNumber", pageNumber.toString());

    if (category) {
      params = params.set("category", category);
    }
    if (rating !== null && rating !== '' && rating !== 0) {
      params = params.set("Rating", rating.toString());
    }
    if (brands && brands.length > 0) {
       params = params.set("Brand", brands.join(","));
    }
    if (colours && colours.length > 0) {
       params = params.set("Colours", colours.join(","));
    }
    if (searchTerm) {
      params = params.set("SearchTerm", searchTerm);
    }
    if (sortColumn) {
      params = params.set("SortColumn", sortColumn);
    }
    if (sortDirection) {
      params = params.set("SortDirection", sortDirection);
    }

    console.log("Filtering with Params:", params.toString());
    return this.http.get<FilterApiResponse>(`${this.apiUrl}/vehicles/Filter`, { params });
  }
}