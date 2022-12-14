import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { GalleryModule } from './gallery/gallery.module';
import { CalendarModule } from './calendar/calendar.module';
import { ProfileModule } from './profile/profile.module';
import { EventsModule } from './events/events.module';
import { StatsModule } from './stats/stats.module';
import { ChatModule } from './chat/chat.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AsideModule } from './aside/aside.module';
import { MenuMobileModule } from './menu-mobile/menu-mobile.module';
@NgModule({
  
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    GalleryModule,
    CalendarModule,
    ProfileModule,
    EventsModule,
    AsideModule,
    ProfileModule,
    EventsModule,
    StatsModule,
    ChatModule,
    MenuMobileModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
