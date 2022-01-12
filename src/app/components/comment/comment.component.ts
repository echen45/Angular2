import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  createComment(){
    
  }
}
