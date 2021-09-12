import { Services } from "./services";

export interface Appointment {
  id: number; //userId
  service: Services[];
  year: number;
  month: number;
  day: number;
  hour: string;
}
