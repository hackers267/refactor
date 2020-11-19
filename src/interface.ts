export interface PlayItem {
  name: string;
  type: string;
}

export interface Play {
  [propName: string]: PlayItem;
}

export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
