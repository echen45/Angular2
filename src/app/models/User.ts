import * as internal from "stream";
import { Post } from "./Post";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    profilePic: string;
    password: string;
    likedPosts: Array<Post>;

}