import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { AsideModule } from '../aside/aside.module';
import { FormsModule } from '@angular/forms';
import { MenuMobileModule } from '../menu-mobile/menu-mobile.module';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    AsideModule,
    FormsModule,
    MenuMobileModule
  ]
})
export class ChatModule { }
