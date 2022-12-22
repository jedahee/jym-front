import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from '../events.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Output() addCalendarEvent = new EventEmitter<any>();
  @Output() addEventEmitter = new EventEmitter<any>();
  @Output() delCalendarEventEmitter = new EventEmitter<any>();
  
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};
  @ViewChild('success_msg_ref') success_msg_ref: ElementRef = <ElementRef>{};
  @Input('eventsCompleted') eventsCompleted: any = [];
  @Input('date_selected') date_selected: string = "";
  @Input('events') events: any = [];

  public error_msg: String = "";
  public user: User = <User>{};
  public url: String = environment.URL;
  public isAddingEvent: boolean = false;
  public eventNameToAdd: String = "";
  public isDeletedAnyEvent: boolean = false;

  constructor(private e_service: EventsService, private auth_service: AuthService, private rt: Router, private anim_service: AnimService) {
  }

  selectEvent(e: any, id: number) {
    if (!e.srcElement.classList.contains("trash-container") && !e.srcElement.classList.contains("trash-icon"))    
      this.addCalendarEvent.emit(id);
  }


  setIsAddingEvent(value: boolean) {
    this.isAddingEvent = value;
  }
  
  addEvent(e:any) {
    if ((e.key.toLowerCase() == 'enter' && e.code.toLowerCase() == 'enter') || (e.code.toLowerCase() == 'period')) {
      
      this.e_service.addEvent(this.eventNameToAdd).subscribe(data => {
        if (this.isDeletedAnyEvent)
          this.events.push(data.event);
        this.setIsAddingEvent(false);
        this.eventNameToAdd = "";
        this.addEventEmitter.emit(data.event);

      }, error => {
        if (error.status == 401 || error.error.message?.toLowerCase() == "token has expired"){
          this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
          setTimeout(()=>{
            this.rt.navigate(["/"])
          }, 3000);
        } else {
          this.anim_service.popupAnim(this.error_msg_ref, error.msg || error.message);
        }
      });
      
      return false;
    }
    return true;

  }

  addEventClick() {
      
    this.e_service.addEvent(this.eventNameToAdd).subscribe(data => {
      console.log("llega")
      if (this.isDeletedAnyEvent)
        this.events.push(data.event);
        console.log("muestra")
      this.setIsAddingEvent(false);
      this.eventNameToAdd = "";
      this.addEventEmitter.emit(data.event);

    }, error => {
      if (error.status == 401 || error.error.message?.toLowerCase() == "token has expired"){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg || error.message);
      }
    });
    

  }

  delEvent(id: number) {
    this.e_service.delEvent(id).subscribe(data => {
      this.anim_service.popupAnim(this.success_msg_ref, data.msg || data.message);
      this.eventsCompleted = this.eventsCompleted.filter((event:any) => {return event.event.id != id});
      let eventsIds:any[] = [];
      this.eventsCompleted.forEach((e:any) => {eventsIds.push(e.id)})
      this.delCalendarEventEmitter.emit(eventsIds);
      this.isDeletedAnyEvent = true;
      this.events = this.events.filter((event:any) => {return event.id != id});
      
    }, error => {
      if (error.status == 401 || error.error.message?.toLowerCase() == "token has expired"){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg || error.message);
      }
    });
  }

  delCalendarEvent(id: number) {
    this.e_service.delCalendarEvent(id).subscribe(data => {
      this.eventsCompleted = this.eventsCompleted.filter((ev_c: any)=>{ return ev_c.id != id });
      let eventsIds:any[] = [];
      this.eventsCompleted.forEach((e:any) => {eventsIds.push(e.id)})
      this.delCalendarEventEmitter.emit(eventsIds);
    }, error => {
      if (error.status == 401 || error.error.message?.toLowerCase() == "token has expired"){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg || error.message);
      }
    })
  }

  ngOnInit(): void {

  }

}
