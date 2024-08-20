export interface Books {
  _id: string;
  title: string;
  // description:string,
  // isbn:string,
  // published:Date,
  // rating:number,
  // reviews_count:number,
  image: string;
  genre: { _id: string }[];
  author: { _id: string }[];
}

