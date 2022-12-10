import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};
  @ViewChild('success_msg_ref') success_msg_ref: ElementRef = <ElementRef>{};
  @ViewChild('photoProfile') photoProfile: ElementRef = <ElementRef>{};

  public token: string | null = "";
  public error_msg: String = "";
  public url: String = environment.URL;
  public user: User = <User>{};
  public path: string = "";
  public file: File = <File>{};
  public photos: String[] = [];
  public isActive: string = "";
  public user_path_photo: string = "";

  constructor(private auth_service: AuthService, private rt: Router, private anim_service: AnimService) {
    this.token = localStorage.getItem("token_jym");

    if (this.token == "") {
      this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
      setTimeout(()=>{
        this.rt.navigate(["/"])
      }, 3000);
    }

    this.auth_service.me().subscribe(data => {
      this.user = data.user;
      let userPathArr = this.user.path.split("/");
      userPathArr.shift();
      this.path = userPathArr.join("/");

      this.auth_service.getAllPhotos(this.user.id).subscribe(data => {
        this.photos = data.photos;
        this.photos.shift();
        this.photos.shift();
        
        this.user_path_photo = data.path;
      }, error => {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg);
      });

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

  updateName(id: number, name: string) {
    this.auth_service.updateName(id, name).subscribe(data => {
      this.anim_service.popupAnim(this.success_msg_ref, data.msg);

    }, error => {
      if (error.status == 401){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg);
      }
      
    });
  }

  setPhoto(id: number, event: any) {
    this.file = event.target.files[0];
    
    if (this.file != undefined) {
      this.auth_service.setPhoto(id, this.file).subscribe(data => {
        let otherPhotoProfileImgArr = data.path.split("/");
        otherPhotoProfileImgArr.shift();
        this.photoProfile.nativeElement.src = this.url + "/" + otherPhotoProfileImgArr.join("/");

        this.anim_service.popupAnim(this.success_msg_ref, data.msg);

      }, error => {
        if (error.status == 401){
          this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
          setTimeout(()=>{
            this.rt.navigate(["/"])
          }, 3000);
        } else {
          this.anim_service.popupAnim(this.error_msg_ref, error.msg);
        }
      });
    } 
  }

  setPhotoOld(id: number, path: string, filename: string) {
    let path_complete = ""

    if (id == 1)
      path_complete = path + 'jesus/' + filename;
    else if (id == 2)
      path_complete = path + 'macarena/' + filename;

    this.auth_service.setPhotoOld(id, path_complete).subscribe(data => {
      let otherPhotoProfileImgArr = data.path.split("/");
      otherPhotoProfileImgArr.shift();
      this.photoProfile.nativeElement.src = this.url + "/" + otherPhotoProfileImgArr.join("/");

      this.anim_service.popupAnim(this.success_msg_ref, data.msg);
    }, error => {
      if (error.status == 401){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg);
      }
    });
  }

  ngOnInit(): void {
  }

}
