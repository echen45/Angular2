import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posted: boolean = false;
  post: Post = <Post>{};
  user: User = <User>{};
  posts: Array<Post> = [];
  postId: number = 0;
  page: number = 999999;
  numPages: number = 1;
  totalPosts: number = 0;
  fullList: Array<Post> = [];
  showPageButtons: Boolean = false;


  domain: string = "http://3.21.168.108:9000"

  isLoggedin: boolean = true;

  public imgInput: FileList = <FileList> {}

  constructor(private appServ: AppService, private router: Router, private httpCli: HttpClient) { }

  ngOnInit(): void {
    this.httpCli.get<any>(`${this.domain}/post/all-original`).subscribe(responseBody1 =>{
          this.fullList = responseBody1;
          this.totalPosts = this.fullList.length;
          this.numPages = (this.totalPosts / 20);
          this.numPages = Math.ceil(this.numPages) - 1;
          console.log(this.showPageButtons);
          this.appServ.storeUserSessionDTO();
        }
          );

    this.appServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data;  
        this.appServ.userProfile = responseBody.data;
        this.getAllPosts(); //Gets the list of all paginated posts page 1, size 20
        
      }else{
        this.router.navigate(["/"])
      }
    })

    
  }

  ngDoCheck(){
    console.log("from ng do check")
    if(this.numPages > 0){
      this.showPageButtons = true;
    }
    console.log(this.numPages);
    console.log(this.showPageButtons);
  }

  getAllPosts(){
    this.appServ.getAllPosts().subscribe(responseBody => {
        console.log(responseBody);
        this.posts = responseBody;
        this.page = 1;

        this.posts.forEach( post => {
          if (this.user.likes.some(likedPost => post.id == likedPost.id)){
              post.liked = true;
          }else{
            post.liked = false;
          }

         if(this.post.comments){
            this.post.comments.forEach( element =>{
            if (this.user.likes.some(likedComent => element.id == likedComent.id)){
              element.liked = true;
          }else{
            element.liked = false;
          }

          })}

          
        });

        console.log(this.posts)

        this.posts.sort((a,b) => b.id - a.id);
        
    })
  }

  /* createPost(){
    this.appServ.createPost(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }*/

  /* likepost(){
    this.appServ.likePost().subscribe(responseBody => {
      this.post = responseBody;
      /* console.log(this.post); */ 
   /*  })
  } */ 

  likePost(postId: number){
    this.httpCli.patch<any>(`${this.domain}/user/${this.user.id}/post/${postId}`,null).subscribe();
    }

  /* deletepost(){
    this.appServ.deletePost(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  } */

  /* comment(){
    this.appServ.comment(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }  */
  
  handleFileInput(event :any){

    this.imgInput = event.target.files;

  }

  createPost(): void{
    let file: File = this.imgInput[0];
    var formData: FormData = new FormData();
    formData.append("message", this.post.message);
    formData.append('file', file);
    formData.append("author", JSON.stringify(this.user.id));


    this.httpCli.post<any>(`${this.domain}/post`, formData).subscribe();

    console.log("post has been sent")

    window.location.reload();
  }

  comment(): void{
    console.log(this.post.id)
    let file: File = this.imgInput[0];
    var formData: FormData = new FormData();
    formData.append("message", this.post.message);
    formData.append('file', file);
    formData.append("author", JSON.stringify(this.user.id));
    formData.append("originalPostId", JSON.stringify(this.postId));
    


    this.httpCli.post<any>(`${this.domain}/post`, formData).subscribe();

    console.log("post has been sent")

    window.location.reload();
  }

  setId(id: number){

    this.postId = id;

  }

  navigateToFirst(){
    this.httpCli.get<any>(`${this.domain}/post/paged/0/20`).subscribe(responseBody => {
      console.log(responseBody);
      this.posts = responseBody;
      this.page = 0;
      console.log("first Page")
      console.log(this.page)
      this.posts.sort((a,b) => b.id - a.id);
    }
    
    );
  }

  navigateToPrevious(){
    if(this.page - 1 < 0){
      this.page = 0;
    }else{
      this.page = this.page - 1;
    }


    this.httpCli.get<any>(`${this.domain}/post/paged/${this.page}/20`).subscribe(responseBody => {
      console.log(responseBody);
      this.posts = responseBody;
      console.log("previous Page")
      console.log(this.page)
      this.posts.sort((a,b) => b.id - a.id);
    }
    );

  }

  navigateToNext(){
      
      if(this.page + 1 <= this.numPages){
        this.page = this.page + 1;
      }else{
        this.page = this.numPages;
      }
   

    this.httpCli.get<any>(`${this.domain}/post/paged/${this.page}/20`).subscribe(responseBody => {
      console.log(responseBody);
      this.posts = responseBody;
      console.log("next Page")
      console.log(this.page)
      this.posts.sort((a,b) => b.id - a.id);
    }
    );
  }

  navigateToLast(){
    this.httpCli.get<any>(`${this.domain}/post/paged/${this.numPages}/20`).subscribe(responseBody => {
      console.log(responseBody);
      this.posts = responseBody;
      this.page = this.numPages;
      console.log("last Page")
      console.log(this.page)
      this.posts.sort((a,b) => b.id - a.id);
    }
    );
  }
  
  navigateToProfile(userId:number){
    this.httpCli.get<any>(`${this.domain}/user/${userId}`).subscribe(responseBody =>{
      this.appServ.userProfile = responseBody;
      console.log("response body from navigate to profile")
      console.log(responseBody);
      console.log(this.appServ.userProfile);
      this.router.navigate(["/profile"]);
    }
      );
      console.log("user id: " + userId)
      console.log(this.appServ.userProfile);
      //this.router.navigate(["/profile"]);
  }
}
