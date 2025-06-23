export class CreatePostDto {
  title: string;
  content: string;
  authorId: string;

  constructor({
    title,
    content,
    authorId,
  }: {
    title: string;
    content: string;
    authorId: string;
  }) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
