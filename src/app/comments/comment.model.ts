export default class Comment {
  constructor(
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
  ) {
    this.postId = postId;
    this.id = id;
    this.name = name;
    this.email = email;
    this.body = body;
  }
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
