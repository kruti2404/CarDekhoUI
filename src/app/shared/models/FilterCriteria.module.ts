
 // src/app/core/models/api-response.model.ts
 import { Car } from '../models/car.module'; // Adjust path if necessary

 // Interface for the specific response of the Filter API endpoint
 export interface FilterApiResponse {
   result: {
     vehicles: Car[];
     totalPages: number; // Clarify: Is this total pages or total items? Rename if it's total items.
     // totalItems?: number; // Consider adding if API provides it
   };
   // Define specific types if you know the structure
   categories: { value: string; name: string }[]; // Example structure
   brands: { value: string; name: string }[];     // Example structure
   colours: { value: string; name: string }[];    // Example structure
 }

 // Example interface for the initial data loaded (categories, brands, etc.)
 export interface InitialLoadData {
    categories: { value: string; name: string }[];
    brands: { value: string; name: string }[];
    colours: { value: string; name: string }[];
    // Add other initial data properties if needed
 }

 // Example interface for Add/Edit responses (adjust as needed)
 export interface VehicleMutationResponse {
    success: boolean;
    message?: string;
    vehicle?: Car; // Optionally return the created/updated vehicle
 }
