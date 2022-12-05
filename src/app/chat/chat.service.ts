import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  sendMsg(username: String, msg: String) {
    let data = {
      username: username,
      message: msg,
    }
    
    return this.http.post<any>(this.url + 'message', data);
  }
}
