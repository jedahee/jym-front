import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core'; 
import { AnimService } from 'src/app/services/anim.service';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService } from '../calendar.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('error_msg_ref') error_msg_ref: ElementRef = <ElementRef>{};
  @ViewChild('success_msg_ref') success_msg_ref: ElementRef = <ElementRef>{};

  public isEventContainerHidden: boolean = false;
  public token: string | null = "";
  public error_msg: String = "";
  public user: User = <User>{};
  public url: String = environment.URL;
  public actualDay: number = -1;
  public actualMonth: string = "";
  public actualMonth_no: number = -1;
  public month_no: number = -1;
  public actualYear: number = -1;
  public modelYear: number = -1;
  public months: string[] = [];
  public years_available: number[] = [];
  public INIT_YEAR: number = 2021;
  public INIT_MONTH: number = 6;
  public INIT_DAY: number = 14;
  public days_of_month: number[] = [];
  public days_detailed: number[] = [];
  public details: any[] = [];

  constructor(private calendar_service: CalendarService, private auth_service: AuthService, private rt: Router, private anim_service: AnimService) { 
    this.months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",      
    ];

    this.token = localStorage.getItem("token_jym");

    if (this.token == "") {
      this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
      setTimeout(()=>{
        this.rt.navigate(["/"])
      }, 3000);
    }

    this.auth_service.me().subscribe(data => {
      this.user = data.user;
     
      this.actualDay = new Date().getDate();
      this.actualMonth_no = new Date().getMonth();
      this.month_no = new Date().getMonth();
      this.actualYear = new Date().getFullYear();
      this.modelYear = new Date().getFullYear();
      this.actualMonth = this.months[this.actualMonth_no];
      this.days_of_month = Array(new Date(this.actualYear, this.actualMonth_no+1, 0).getDate()).fill(1).map((x, i)=>i+1);

      for (let i = this.INIT_YEAR; i <= this.actualYear; i++)
        this.years_available.push(i);
      
      this.getDetailsOfMonth(this.actualMonth_no+1, this.actualYear);

    }, error => {
      if (error.status == 401){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      }
    });

  }

  ngOnInit(): void {
  }

  toggleEventContainer(action: string) {
    let actions = [
      "cancel",
      "open"
    ];

    if (actions.includes(action)) {
      if (action == actions[0])
        this.isEventContainerHidden = false;
      else if (action == actions[1])
        this.isEventContainerHidden = true;
    }
    
  }

  prev_month() {
    if (this.modelYear >= this.INIT_YEAR) {
      if ((this.INIT_YEAR == this.modelYear && this.month_no > this.INIT_MONTH) || (this.modelYear > this.INIT_YEAR)) {
        if (this.month_no == 0) {
          this.month_no = 11;
          this.modelYear--;
        } else
          this.month_no--;
          
        this.actualMonth = this.months[this.month_no];
        this.days_of_month = Array(new Date(this.modelYear, this.month_no+1, 0).getDate()).fill(1).map((x, i)=>i+1);
        this.getDetailsOfMonth(this.month_no+1, this.modelYear);
      }
    }
  }

  next_month() {
    if (this.modelYear <= this.actualYear) {
      if ((this.actualYear == this.modelYear && this.month_no < this.actualMonth_no) || (this.modelYear < this.actualYear)) {
        if (this.month_no == 11) {
          this.month_no = 0;
          this.modelYear++;
        } else
          this.month_no++;
    
        this.actualMonth = this.months[this.month_no];
        this.days_of_month = Array(new Date(this.modelYear, this.month_no+1, 0).getDate()).fill(1).map((x, i)=>i+1);
        this.getDetailsOfMonth(this.month_no+1, this.modelYear);
      }
    }
    
  }

  getDetailsOfMonth(month: number, year: number) {
    this.calendar_service.getDetailsOfMonth(month, year).subscribe(data => {
      this.details = data;
      this.days_detailed = [];
      
      this.details.forEach(dt => {
        this.days_detailed.push(Number(dt["day"]));
      });
      
    }, error => {
      if (error.status == 401){
        this.anim_service.popupAnim(this.error_msg_ref, "Tienes que iniciar sesión de nuevo");
        setTimeout(()=>{
          this.rt.navigate(["/"])
        }, 3000);
      } else {
        this.anim_service.popupAnim(this.error_msg_ref, error.msg || error.message);
      }
    });
  }

  checkDay(day: number) {
    let i = 0;
    let res = new Array();
    
    if (this.days_detailed.includes(day)) {
      this.days_detailed.forEach(days_dt => {
        if (day == days_dt)
          res.push(this.details[i]["detail"]["dayId"]);
        i++;
      })
    }

    return res;
    

  }

}
