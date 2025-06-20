export interface IAddress {
  city: string;
  post: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "admin" | "user";
  address: IAddress;
}

