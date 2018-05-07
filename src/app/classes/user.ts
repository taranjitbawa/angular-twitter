export class User {
  toJsonObject(): Object {
    return {
      name: this.name,
      email: this.email
    };
  }

  constructor(public name: string,
    public email: string) {
  }
}
