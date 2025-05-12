// src/app/core/services/cardekhoservice.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Car } from '../../shared/models/car.module'; 
import { FilterApiResponse, InitialLoadData, VehicleMutationResponse } from '../../shared/models/FilterCriteria.module';

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
  coloursNames: string;
}
@Injectable({
  providedIn: 'root'
})
export class CardekhoserviceService {

  private apiUrl = environment.apiurls;

  constructor(private http: HttpClient) { }

  public getVehicleDetails(id: number): Observable<VehicleDetailsResponse> { 
    return this.http.get<VehicleDetailsResponse>(`${this.apiUrl}/vehicles/GetVehicles/${id}`);
  }

  public loadInitialFilterData(): Observable<InitialLoadData> {
    return this.http.get<InitialLoadData>(`${this.apiUrl}/Home/loadData`);
  }

   public addVehicle(formData: FormData): Observable<VehicleMutationResponse> {
    console.log('Adding vehicle via service:', formData);
    return this.http.post<VehicleMutationResponse>(`${this.apiUrl}/Home/AddVehicle`, formData);
  }

    public updateVehicle(formData: FormData): Observable<VehicleMutationResponse> {
    console.log('Updating vehicle via service:', formData);
    return this.http.post<VehicleMutationResponse>(`${this.apiUrl}/Home/Editvehicle`, formData);
  }

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