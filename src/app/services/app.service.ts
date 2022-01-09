import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {



  backendDomain: string = "http://localhost:9000"

  

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

  

  /* registerAccount(user: User){
    return this.httpCli.post<any>(`${this.domain}/users`, {
      "username": user.userName,
      "password": user.password,
      "firstname": user.firstName,
      "lastname": user.lastName
    });
  } */

  registerAccount(user:User) {
    var formData: any = new FormData();
    formData.append('email', user.email);
    formData.append('username', user.userName);
    formData.append('password', user.password);
    formData.append('firstname', user.firstName);
    formData.append('lastname', user.lastName);
    formData.append('confirm', user.confirm);
    return this.httpCli.post<any>(`${this.domain}/user`, formData);
  }

  
}
