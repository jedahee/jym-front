import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { User } from 'src/app/models/user';
import { CalendarService } from 'src/app/calendar/calendar.service';
import { EventsService } from 'src/app/events/events.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};

  public token: string | null = "";
  public error_msg: String = "";
  public calendars: any[] = [];
  public smile_punct: number = 0;
  public meh_punct: number = 0;
  public sad_punct: number = 0;
  public total_punct: number = 0;
  public total_events_punct: number = 0;
  public user: User = <User>{};
  public events_stats: any[] = [];
  public url: String = environment.URL;

  constructor(private e_service: EventsService, private calendar_service: CalendarService, private auth_service: AuthService, private rt: Router, private anim_service: AnimService) { 
    this.token = localStorage.getItem("token_jym");

    if (this.token == "") {
      this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
      setTimeout(()=>{
        this.rt.navigate(["/"])
      }, 3000);
    }

    this.auth_service.me().subscribe(data => {
      this.user = data.user;
      this.calculateDays();
      this.calculateEvents();

    }, error => {
      if (error.status == 401 || error.message.toLowerCase() == "token has expired"){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      }
    });

  
  }

  calculateDays() {
    this.calendar_service.getCalendars().subscribe(data => {
      this.calendars = data.calendar;
      this.calendars.forEach((ca: any) => {
        if (ca.dayId == 1) 
          this.sad_punct++;
        else if (ca.dayId == 2) 
          this.meh_punct++;
        else if (ca.dayId == 3) 
          this.smile_punct++;
        
        this.total_punct++;
      });
    });
  }

  calculateEvents() {
    this.e_service.getEventsUsed().subscribe(data => {
      this.events_stats = data.events_used;
      this.events_stats.forEach((es:any) => {
        this.total_events_punct += es.num_times;
      });
    });
  }

  ngOnInit(): void {
  }

}
