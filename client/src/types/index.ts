export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
}

export interface Sandal {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  status: boolean;
}
