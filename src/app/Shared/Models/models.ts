export interface Author {
  _id: any;
  name: any;
  bio?: any;
  birthDate?: any;
  nationality?: string;
  image?: string;
  books?: any[];
}

export interface Book {
  _id: string;
  title: string;
  author: any[];
  description: string;
  image: string;
}

export interface Genre {
  _id: string;
  name: string;
  description: string;
  books: any[];
}
