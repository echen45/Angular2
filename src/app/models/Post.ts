import { User } from "./User";

export interface Post{
    id: number;
    message: string;
    picture: string;
    time: string;
    likes: number;
    author: User;
    originalPost: Post;

}