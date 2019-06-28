import {User} from './user.model';

export interface AllUsers {
  current_page: 1;
  data: User[],
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number
}
