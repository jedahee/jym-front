import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { AsideModule } from '../aside/aside.module';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    AsideModule
  ]
})
export class EventsModule { }
