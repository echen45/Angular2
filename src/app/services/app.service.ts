import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  domain: string = "http://localhost:9000"

  

  constructor(private httpCli: HttpClient) { }

  login(user: User ){
    return this.httpCli.post<any>(`${this.domain}/session`, {
      "userName": user.userName,
      "password": user.password
    }, {withCredentials: true});
  }

  logout(){
    return this.httpCli.delete<any>(`${this.domain}/session`, {withCredentials: true});
  }

  checkSession(){
    return this.httpCli.get<any>(`${this.domain}/session`, {withCredentials: true});
  }

  
}
