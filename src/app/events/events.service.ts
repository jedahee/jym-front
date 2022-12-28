import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.url + 'getEvents');
  }

  addEvent(name: String) {
    let data = {
      name: name
    }

    return this.http.post<any>(this.url + 'addEvent', data);
  }

  delEvent(id: number) {
    return this.http.delete<any>(this.url + 'delEvent/' + id);
  }

  // ----- CALENDAR EVENTS COMPLETED -----

  addCalendarEvent(eventId: number, date: string) {
    let data = {
      eventId: eventId,
      date: date
    }

    return this.http.post<any>(this.url + 'addEventCalendar', data);
  }

  getCalendarEvents() {
    return this.http.get<any>(this.url + 'getCalendarEvents');
  }

  getEventsUsed() {
    return this.http.get<any>(this.url + 'eventsMoreUsed');
  }

  delCalendarEvent(id: number) {
    return this.http.delete<any>(this.url + 'delCalendarEvent/' + id);
  }
}
