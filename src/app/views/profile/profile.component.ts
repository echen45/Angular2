import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiServ: AppService, private router: Router, private httpCli: HttpClient) { }

  domain: string = "http://3.21.168.108/:9000";

  user: User = <User>{};

  posts: Array<Post> = [];

  public imgInput: FileList = <FileList> {}

  ngOnInit(): void {
    
    console.log("api.userprofile");
    console.log(this.user);

    
    
    if(this.apiServ.userProfile.id){
      this.user = this.apiServ.userProfile;
      this.getAllPostsForAUser();
      console.log("truthy value")
      
    
    }else{
      this.apiServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data; 
        console.log(this.user)
        this.getAllPostsForAUser();
      }else{
        this.router.navigate(["/"])

      }

    })
    }
  }

  isLoggedInUser():Boolean{
    return this.apiServ.loggedInUserProfile.id == this.apiServ.userProfile.id;
  }

  handleFileInput(event :any){

    this.imgInput = event.target.files;

  }

  updateUser2(): void {
    let file: File = this.imgInput[0];
    var formData: FormData = new FormData();
    formData.append('userName', this.user.userName);
    formData.append('email', this.user.email);
   
    formData.append('password', this.user.password);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('id',  JSON.stringify(this.user.id));
    formData.append('file', file);

    console.log("updated user")

   
    this.httpCli.put<FormData>(`${this.domain}/user`, formData).subscribe();

    window.location.reload();
  }

  
   updateUser(): void{
    this.apiServ.updateUser(this.user).subscribe({next:responseBody =>{
      /* window.location.reload()
      console.log(responseBody)
 */
    }})
  }  

  getAllPostsForAUser(): void {
    console.log("profile user");
    console.log(this.user);
    this.httpCli.get<any>(`${this.domain}/post/${this.user.id}/all-original-user`).subscribe(responseBody => {
      this.posts = responseBody
      this.posts.sort((a,b) => b.id - a.id);
      console.log(this.posts)

    })

    /* this.apiServ.getAllPostsForAUser(this.user).subscribe(responseBody => {
      this.posts = responseBody
      this.posts.sort((a,b) => b.id - a.id);
      console.log(this.posts)

    }) */
  }

}
