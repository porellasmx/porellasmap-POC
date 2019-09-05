import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor() {}

  getPlaceTypeValue(addressComponents: any[], type: string): string {
    return (addressComponents.find(({ types }) => types.includes(type)) || {}).long_name || null;
  }
}
