import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHamburguerComponent } from './menu-hamburguer/menu-hamburguer.component';


@NgModule({
  declarations: [MenuHamburguerComponent],
  imports: [
    CommonModule,
    FormsModule
  ], exports: [
    MenuHamburguerComponent
  ]
})
export class MenuMobileModule { }
