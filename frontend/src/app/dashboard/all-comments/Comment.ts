export class Comment {
  id!: number;
  comment!: string;
  user!: User;
  BlogPost!: BlogPost;
}

interface User {
    id: number;
    username: string;
    name: string;
}

interface BlogPost {
    id: number;
    title: string;
    content: string;
    user: User;
}