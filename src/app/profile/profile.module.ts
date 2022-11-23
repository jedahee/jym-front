import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AsideModule } from '../aside/aside.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AsideModule
  ]
})
export class ProfileModule { }
