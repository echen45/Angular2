import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  domain: string = "http://localhost:9000"

  public imgInput: FileList = <FileList> {}

  constructor(private appServ: AppService, private router: Router, private httpCli: HttpClient) { }

  ngOnInit(): void {
    this.appServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data;  
        this.getAllPosts();
      }/* else{
        this.router.navigate(["/"])
      } */
    })
  }
  getAllPosts(){
    this.appServ.getAllPosts().subscribe(responseBody => {
        console.log(responseBody);
        this.posts = responseBody;
        

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

  
}
