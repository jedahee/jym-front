import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideModule } from '../aside/aside.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    AsideModule,
    FormsModule
  ]
})
export class CalendarModule { }
