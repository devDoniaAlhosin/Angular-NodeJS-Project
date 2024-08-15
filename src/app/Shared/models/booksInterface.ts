
export interface Books {
  _id: string;
  title: string;
  image: string;
  genre: Array<{
    _id: string;
    name: string;
  }>;
  author: Array<{
    _id: string;
    name: string;
  }>;
}
