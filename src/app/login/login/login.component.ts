import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AnimService } from 'src/app/services/anim.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};

  public user: User = <User>{};
  public error_msg: String = "";

  constructor(private anim_service: AnimService, private auth_service: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(user: Object) {
    this.auth_service.login(user).subscribe(datos => {
      localStorage.removeItem('token_jym');
      localStorage.setItem('token_jym', datos.authorisation.token);
      this.router.navigate(["/gallery"]);
    }, error => {
      if (error.status == 401) {
        this.anim_service.popupAnim(this.error_msg_ref, "Nombre y/o contraseña incorrecto(s)");
      }
    });
  }

}
