import { User } from "./User";

export interface Post{
    id: number;
    message: string;
    picture: File;
    time: string;
    likes: number;
    author: User;
    originalPost: Post;

}