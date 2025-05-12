import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})



export class CardekhoserviceService {

  // Inject HttpClient via the constructor
  constructor(private http: HttpClient) { }


  private ApiUrl = environment.apiurls
  public get(): Observable<any> {
    return this.http.get(this.ApiUrl);
  }
  public Getdetails(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/vehicles/GetVehicles/${id}`)
  }

  public loadData(): Observable<any> {
    return this.http.get(`${this.ApiUrl}/Home/loadData`);
  }

  public sendReq(formdata : FormData): Observable<any>{
    console.log(formdata);
    return this.http.post(`${this.ApiUrl}/Home/AddVehicle`,formdata);
  }

  public sendEditReq(formdata : FormData): Observable<any>{
    console.log(formdata);
    return this.http.post(`${this.ApiUrl}/Home/Editvehicle`,formdata);
  }
  public Filter(category: string, Brand: string[], Colours: string[], Rating: number, MinPrice: number, MaxPrice: number, PageSize : number, PageNumber: number): Observable<any> {
    let params = new HttpParams()
      .set("category", category)
      .set("Rating", Rating.toString())
      .set("MinPrice", MinPrice.toString())
      .set("MaxPrice", MaxPrice.toString())
      .set("Brand", Brand.join(","))
      .set("Colours", Colours.join(","))
      .set("PageSize", PageSize.toString())
      .set("PageNumber", PageNumber.toString())
    return this.http.get(`${this.ApiUrl}/vehicles/Filter`, { params });
  }

}
