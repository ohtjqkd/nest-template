export class Users {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;

  static of(params: Partial<Users>): Users {
    const user = new Users();
    Object.assign(user, params);
    return user;
  }
}
