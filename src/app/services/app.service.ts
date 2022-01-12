import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppService {



  backendDomain: string = "http://localhost:9000"

  public imgInput: FileList = <FileList> {}

  

  constructor(private httpCli: HttpClient) { }

  login(user: User ){
    return this.httpCli.post<any>(`${this.backendDomain}/session`, {
      "userName": user.userName,
      "password": user.password
    }, {withCredentials: true});
  }

  logout(){
    return this.httpCli.delete<any>(`${this.backendDomain}/session`, {withCredentials: true});
  }

  checkSession(){
    return this.httpCli.get<any>(`${this.backendDomain}/session`, {withCredentials: true});
  }


  domain: string = "http://localhost:9000"

  registerAccount(user:User) {
    var formData: any = new FormData();
    formData.append('email', user.email);
    formData.append('userName', user.userName);
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('confirm', user.confirm);
    //formData.append('profilePic', user.profilePic);
    return this.httpCli.post<any>(`${this.domain}/user`, formData);
  }

  createPost(post:Post) {
    var formData: any = new FormData();
    formData.append('email', post.message);
    return this.httpCli.post<any>(`${this.domain}/post`, formData);
  }

  getAllPosts(){
    return this.httpCli.get<any>(`${this.domain}/post`);
  }
  handleFileInput(event :any){

    this.imgInput = event.target.files;

  }

  updateUser(user:User) {

    
    var formData: any = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
   let file: File = this.imgInput[0];
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('id', user.id);
    formData.append('file', file);

    console.log(formData)

    console.log(user)
   
    return this.httpCli.put<any>(`${this.domain}/user`, formData);
  }

  sendEmail(user:User){
    return this.httpCli.patch<any>(`${this.domain}/user`, {
      "userName": user.userName
    })

  }

  getAllPostsForAUser(user:User){
    return this.httpCli.get<any>(`${this.domain}/post/${user.id}/all-original-user`)
  }



  
}
