import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideModule } from '../aside/aside.module';
import { GalleryComponent } from './gallery/gallery.component';
import { StarComponent } from '../components/star/star.component';

@NgModule({
  declarations: [
    GalleryComponent,
    StarComponent
  ],
  imports: [
    CommonModule,
    AsideModule
  ],
  exports: [StarComponent],
})
export class GalleryModule { }
