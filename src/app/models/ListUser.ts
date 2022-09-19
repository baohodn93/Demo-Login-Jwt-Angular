export class ListUsers {
  id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  roles: string[];

  constructor(id:string, name: string, userName: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = ['user'];
  }
}
