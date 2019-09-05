import { Injectable } from '@angular/core';
import { Places } from '../models/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor() {}

  getPlaceTypeValue(addressComponents: Places[], type: string): string {
    let value = null;
    for (const [i] of addressComponents.entries()) {
      if (addressComponents[i].types.includes(type)) {
        value = addressComponents[i].long_name;
        break;
      }
    }
    return value;
  }
}
