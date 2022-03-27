export class ChangeProfileForm {
  public name: string;
  public username: string;
  public email: string;

  constructor(name: string, username: string, email: string) {
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
