import { Marker } from './marker.model';

export interface Report {
  address: string;
  placeName: string;
  description: string;
  abuseType: string;
  dateOfEvent: Date;
  marker?: Marker;
  imageName: any;
}
