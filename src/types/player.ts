    export type Role = 
  | 'WL'
  | 'Singer'
  | 'Bass'
  | 'Keys'
  | 'Drum'
  | 'Guitar'

export type Player = {
  id: number
  name: string
  role: Role
}
