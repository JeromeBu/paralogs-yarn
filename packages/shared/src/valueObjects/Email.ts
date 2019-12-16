const isEmail = (str: string): boolean =>
  !!str.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export class Email {
  private constructor(private value: string) {
    this.value = value;
  }

  static create(email: string) {
    if (!isEmail(email)) {
      throw new Error("Not an Email");
    }

    return new Email(email);
  }
}
