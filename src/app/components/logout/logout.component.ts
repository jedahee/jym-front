import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AnimService } from 'src/app/services/anim.service';
import { ViewChild, ElementRef } from '@angular/core'; 

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};

  public token: string | null = "";
  public error_msg: String = "";
  public user: User = <User>{};
  public isActive: string = "";

  constructor(private anim_service: AnimService, private auth_service: AuthService, private rt: Router) {
    this.token = localStorage.getItem("token_jym");

    if (this.token == "") {
      this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
      setTimeout(()=>{
        this.rt.navigate(["/"])
      }, 3000);
    }

    this.auth_service.me().subscribe(data => {
      this.user = data.user;
    }, error => {
      if (error.status == 401){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      }
    });
  }
  toggleAside(isActive: string) {
    this.isActive = isActive;
  }

  logout() {
    this.auth_service.logout().subscribe(data => {
      this.token = "";
      localStorage.removeItem("token_jym");
      this.rt.navigate(["/"]);
    })
  }

  ngOnInit(): void {
  }

}
