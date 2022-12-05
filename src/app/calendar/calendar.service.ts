import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getDetailsOfMonth(month: number, year: number) {
    let data = {
      month_no: month,
      year: year
    }
    
    return this.http.post<any>(this.url + 'getDetailsOfMonth', data);
  }

  getCalendars() {
    return this.http.get<any>(this.url + 'getCalendars');
  }

  addDetail(details: string, dayId: number, date:string) {
    let data = {
      details: details,
      dayId: dayId,
      date: date
    }

    return this.http.post<any>(this.url + 'addDetail', data);
  }

  editDetail(details: string, dayId: number, date:string, id: number) {
    let data = {
      details: details,
      dayId: dayId,
      date: date
    }

    return this.http.put<any>(this.url + 'editDetail/' + id, data);
  }


  
}
