export interface IBook {
  _id: string;
  name: string;
  description: string;
  image: string;
  pages: number;
  published: number;
}

export interface BookResponse extends IBook {}
