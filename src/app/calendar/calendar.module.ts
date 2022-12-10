import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideModule } from '../aside/aside.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { EventsModule } from '../events/events.module';
import { MenuMobileModule } from '../menu-mobile/menu-mobile.module';
@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    AsideModule,
    FormsModule,
    EventsModule,
    MenuMobileModule
  ]
})
export class CalendarModule { }
