import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  login(user: any) {

    let data = {
      name: user.name,
      password: user.password
    }

    return this.http.post<any>(this.url + 'login', data);
  }

  me() {
    return this.http.get<any>(this.url + 'me');
  }

  getPathImgUser(id: number) {

    let data = {
      id_user: id,
    }

    return this.http.post<any>(this.url + 'getPathImage', data);
  }

  logout() {
    return this.http.post<any>(this.url + 'logout', {});
  }

  updateName(id: number, name: string) {
    let data = {
      id: id,
      name: name,
    }

    return this.http.post<any>(this.url + 'setName', data);
  }

  setPhoto(id: number, photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post<any>(this.url + 'setPhoto/' + id, formData);

  }

  getAllPhotos(id: number) {
    return this.http.get<any>(this.url + 'getAllPhotos/' + id);
  }

  setPhotoOld(id: number, path: string) {
    let data = {
      path: path
    }

    return this.http.post<any>(this.url + 'setPhotoOld/' + id, data);
  }

}
