export interface User{
  userName: string;
  email: string;
  password: string;
}

export class UserDoc{
  constructor(
    public uid: string,
    public userName: string,
    public email: string,
  ){

  }
}
