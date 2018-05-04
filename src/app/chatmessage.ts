export class ChatMessage {

  toJsonObject(): Object {
    return {
      text: this.text,
      sender: this.sender,
      dateSent: this.dateSent.toString()
    }
  }

  constructor(public text: string,
    public sender: string,
    public dateSent?: Date) {
      this.text = text;
      this.sender = sender || 'NULL';
      this.dateSent = dateSent || null;
  }
}
