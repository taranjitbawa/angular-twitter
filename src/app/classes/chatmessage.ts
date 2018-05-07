export class ChatMessage {

  toJsonObject(): Object {
    return {
      text: this.text,
      sender: this.sender,
      dateSent: this.dateSent.toString(),
      color: this.color
    };
  }

  constructor(public text: string,
    public sender: string,
    public color?: string,
    public dateSent?: Date) {
      this.text = text;
      this.sender = sender || 'NULL';
      this.color = color || null;
      this.dateSent = dateSent || null;
  }
}
