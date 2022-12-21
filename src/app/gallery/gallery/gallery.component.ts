import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { GalleryService } from '../gallery.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Gallery } from 'src/app/models/gallery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};

  public token: string | null = "";
  public error_msg: String = "";
  public file: File = <File>{};
  public filePath: string = "";
  public user: User = <User>{};
  public otherUserPathImg: string = "";
  public pictures: Gallery[] = [];
  public isActive: string = "";
  public url: String = environment.URL;

  constructor(private auth_service: AuthService, private rt: Router, private anim_service: AnimService, private gallery_service: GalleryService) {
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
      this.user.path = userPathArr.join("/"); 

      if (this.user.id == 1) {
        this.auth_service.getPathImgUser(2).subscribe(data => {
            let otherUserPathImgArr = data.path.split("/");
            otherUserPathImgArr.shift();
            this.otherUserPathImg = otherUserPathImgArr.join("/");
        }, error => {
          this.anim_service.popupAnim(this.error_msg_ref, "No se ha podido obtener la imagen");
        })
      } else if (this.user.id == 2) {
        this.auth_service.getPathImgUser(1).subscribe(data => {
          let otherUserPathImgArr = data.path.split("/");
          otherUserPathImgArr.shift();
          this.otherUserPathImg = otherUserPathImgArr.join("/");
          
        }, error => {
          this.anim_service.popupAnim(this.error_msg_ref, "No se ha podido obtener la imagen");
        })
      }

      this.getPictures();
    }, error => {
      if (error.status == 401 || error.message.toLowerCase() == "token has expired"){
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

  uploadPicture(event: any) {
    this.file = event.target.files[0];
    
    if (this.file != undefined) {
      this.gallery_service.uploadPicture(this.file).subscribe(data => {
        this.pictures.push(data.gallery);
      });
    } 
  }

  getPictures() {
    this.gallery_service.getPictures().subscribe(data => {
      this.pictures = data.galleries;
    });
  }

  removePhoto(id: number) {
    this.gallery_service.deletePhoto(id).subscribe(data => {
      this.pictures = this.pictures.filter(pic => pic.id != id);
    }, error => {
      this.anim_service.popupAnim(this.error_msg_ref, "No se ha podido borrar la foto");
    });
  }


  ngOnInit(): void {
  }

}
