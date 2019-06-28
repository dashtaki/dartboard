export interface User {
  id: number,
  name: string,
  email: string,
  email_verified_at: Date,
  created_at: Date,
  updated_at: Date,
  score: number,
  pivot?: {
    game_id: number,
    user_id: number,
    score: number,
    created_at: Date,
    updated_at: Date
  }
}
