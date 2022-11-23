import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  uploadPicture(photo: File) {

    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post<any>(this.url + 'uploadPicture', formData);
  }

  getPictures() {
    return this.http.get<any>(this.url + 'getPictures');
  }

  updateValue(val: number, photo_id: number, user_id: number) {

    let data = {
      value: val
    }

    return this.http.put<any>(this.url + 'updateValue/' + photo_id + '/' + user_id, data);
    
  }

  getValues(photo_id: number) {
    return this.http.get<any>(this.url + 'getValues/' + photo_id);
  }

  deletePhoto(id: number) {
    return this.http.delete<any>(this.url + 'removePhoto/' + id);
  }

}
