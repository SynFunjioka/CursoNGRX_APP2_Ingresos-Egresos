export interface User{
  userName: string;
  email: string;
  password: string;
}

export class UserDoc{
  static fromFirebase({uid, userName, email}:any){
    return new UserDoc(uid, userName, email);
  }

  constructor(
    public uid: string,
    public userName: string,
    public email: string,
  ){

  }
}
