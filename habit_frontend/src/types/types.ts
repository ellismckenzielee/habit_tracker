interface habit {
  habit: string;
  _id: string;
}

interface week {
  _id: string;
  habits: { [key: string]: number[] };
}

export type { habit, week };
