export class BlogPost {
  id!: number;
  title!: string;
  content!: string;
  user!: User;
}

interface User {
  id: number;
  username: string;
  name: string
}
