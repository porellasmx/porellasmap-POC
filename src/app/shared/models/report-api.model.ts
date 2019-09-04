import { Report } from './report.model';

export interface ReportAPI {
  message: string;
  reports?: Report[];
  report?: Report;
  status: number;
}
