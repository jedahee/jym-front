import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AsideModule } from '../aside/aside.module';
import { MenuMobileModule } from '../menu-mobile/menu-mobile.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AsideModule,
    MenuMobileModule
  ]
})
export class ProfileModule { }
