export class User {
  toJsonObject(): Object {
    return {
      name: this.name,
      email: this.email,
      color: this.color
    };
  }

  constructor(public name: string,
    public email: string,
    public color: string) {
  }
}
