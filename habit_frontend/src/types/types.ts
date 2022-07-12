interface habit {
  name: string;
  _id: string;
  user_id: string;
  dates: string[];
  streak: number;
}

interface week {
  _id: string;
  habits: { [key: string]: number[] };
}

export type { habit, week };
