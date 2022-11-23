import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  popupAnim(el: ElementRef, text: String) {
    el.nativeElement.innerText = text;
    el.nativeElement.classList.add('popup-transition');
    setTimeout(() => {
      el.nativeElement.classList.remove('popup-transition');
    }, 3000);
  }
}
