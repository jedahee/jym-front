import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from '../chat.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import  Pusher  from 'pusher-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};

  public token: string | null = "";
  public error_msg: String = "";
  public other_user: User = <User>{};
  public user: User = <User>{};
  public url: String = environment.URL;
  public msg_text: String = "";
  public path_img: String = "";
  public msgArr: any[] = [];

  constructor(private chat_service: ChatService, private auth_service: AuthService, private rt: Router, private anim_service: AnimService) {
    this.token = localStorage.getItem("token_jym");

    if (this.token == "") {
      this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
      setTimeout(()=>{
        this.rt.navigate(["/"])
      }, 3000);
    }

    this.auth_service.me().subscribe(data => {
      this.user = data.user;

      if (this.user.id == 1) {
        this.auth_service.getUserById(2).subscribe(data => {
          this.other_user = data.user;
          let arr_path = this.other_user.path.split('/');
          let item_path_del = arr_path.pop();
          if (item_path_del?.toLowerCase() != 'default.svg')
            this.path_img = this.url + "/images/user/macarena/" + item_path_del;
          else
            this.path_img = this.url + "/images/user/" + item_path_del;
        })
      } else if (this.user.id == 2) {
        this.auth_service.getUserById(1).subscribe(data => {
          this.other_user = data.user;
          let arr_path = this.other_user.path.split('/');
          let item_path_del = arr_path.pop();

          if (item_path_del?.toLowerCase() != 'default.svg')
            this.path_img = this.url + "/images/user/jesus/" + item_path_del;
          else
            this.path_img = this.url + "/images/user/" + item_path_del;
        })
      }

    }, error => {
      if (error.status == 401 || error.message.toLowerCase() == "token has expired"){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      }
    });


  }

  sendMsg(event:any) {
    if (event.key.toLowerCase() == 'enter' && event.code.toLowerCase() == 'enter')
      this.chat_service.sendMsg(this.user.name, this.msg_text).subscribe((data:any) => { this.msg_text = ""; }) 
  }

  sendMsgClick() {
    this.chat_service.sendMsg(this.user.name, this.msg_text).subscribe((data:any) => { this.msg_text = ""; }) 
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    var pusher = new Pusher('bffc095394f2b42eef63', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('chat-jym-development');
    channel.bind('message', (data:any) => {
      this.msgArr.push(data);
    });
  }

}
