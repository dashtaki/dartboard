import {User} from './user.model';
import {Winner} from './winner.model';

export interface Game {
  id: number;
  created_at: Date;
  updated_at: Date;
  target_score: number;
  winner_id: number;
  users?: User[];
  winner: Winner;
}


