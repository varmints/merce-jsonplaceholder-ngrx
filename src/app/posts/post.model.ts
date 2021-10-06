export default class Post {
  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
  userId: number;
  id: number;
  title: string;
  body: string;
}
