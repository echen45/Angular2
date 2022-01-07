import { Post } from "./Post";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    profilePic: string;
    password: string;
    confirm: string;
    likedPosts: Array<Post>;

}