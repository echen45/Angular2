import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from '../../models/User';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message: string = "";
  user: User = <User>{};

  public imgInput: FileList = <FileList> {}

  domain: string = "http://3.21.168.108:9000";

  constructor(private appServ: AppService, private router: Router, private httpCli: HttpClient) { }

  ngOnInit(): void {
}

handleFileInput(event :any){

  this.imgInput = event.target.files;}

registerAccount(){
  this.appServ.registerAccount(this.user).subscribe({next: responseBody => {
    this.router.navigate(["/main"]);
  }, 
  error: badRequest => {
    this.message = badRequest.error.message;
  }});
}

registerAccount2(): void {
  let file: File = this.imgInput[0];
  var formData: FormData = new FormData();
  formData.append('email', this.user.email);
  formData.append('userName', this.user.userName);
  formData.append('password', this.user.password);
  formData.append('firstName', this.user.firstName);
  formData.append('lastName', this.user.lastName);
  formData.append('confirm', this.user.confirm);
  formData.append('file', file);

  

    


  this.httpCli.post<any>(`${this.domain}/user`, formData).subscribe();

  this.router.navigate(["/"])
}





}
