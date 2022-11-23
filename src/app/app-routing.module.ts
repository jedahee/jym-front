import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { EventsComponent } from './events/events/events.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "gallery",
    component: GalleryComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "chat",
    component: GalleryComponent
  },
  {
    path: "stats",
    component: EventsComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
