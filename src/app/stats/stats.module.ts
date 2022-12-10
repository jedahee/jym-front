import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { AsideModule } from '../aside/aside.module';
import { FormsModule } from '@angular/forms';
import { MenuMobileModule } from '../menu-mobile/menu-mobile.module';

@NgModule({
  declarations: [
    StatsComponent,
    
  ],
  imports: [
    CommonModule,
    AsideModule,
    FormsModule,
    MenuMobileModule
  ]
})
export class StatsModule { }
