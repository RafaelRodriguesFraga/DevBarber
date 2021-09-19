import { Available } from './available';
import { Photos } from "./photos";
import { Services } from "./services";
import { Testimonials } from "./testimonials";

export interface User {
  id: number;
  avatar: string;
  name: string;
  stars: number;
  photos: Photos[];
  services: Services[];
  testimonials: Testimonials[];
  available: Available[];
}
