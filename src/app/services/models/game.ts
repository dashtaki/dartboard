import {User} from './user.model';
import {Winner} from './winner.model';

export interface Game {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  targetScore: number;
  winnerId: number;
  users?: User[];
  winner: Winner;
}


