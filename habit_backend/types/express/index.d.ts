declare namespace Express {
  export interface User {
    _id: string;
    username: string;
    pairId: string;
    pairName: string;
  }
}

interface habit {
  name: string;
  _id: string;
  user_id: string;
  dates: string[];
}
