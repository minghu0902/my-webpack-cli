
export interface UserInterface {
  readonly id: number;
  name: string;
  age: number;
  sex: string;
  county: string;
  [propName: string]: any

  login: (data: any) => Promise<any>;
  logout: (data?: any) => Promise<any>;
}

export class User implements UserInterface {
  readonly id: number;
  name: string;
  age: number;
  sex: string;
  county: string
  
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.sex = data.sex;
    this.county = data.county;
  }

  login(data: any) {
   return Promise.resolve('login');
  }

  logout(data?: any) {
    return Promise.resolve('logout');
  }

}