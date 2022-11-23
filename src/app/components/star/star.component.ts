import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from 'src/app/gallery/gallery.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @Input() photo_id: number = -1;
  @Input() user_id: number = -1;
  @Input() mStars: string = "";

  public stars: any[] = [];
  public mScore: number = -1;
  public yScore: number = -1;

  constructor(private gallery_service: GalleryService) {
    this.stars = [
      {
        value: 1
      },
      {
        value: 2
      },
      {
        value: 3
      },
      {
        value: 4
      },
      {
        value: 5
      }
    ];
  }

  updateValue(val: number) {
    this.gallery_service.updateValue(val, this.photo_id, this.user_id).subscribe(data => {
      this.getValues();
    });
  }

  getValues() {
    this.gallery_service.getValues(this.photo_id).subscribe(data => {
      this.mScore = data.mScore;
      this.yScore = data.yScore;
    })
  }

  ngOnInit(): void {
    this.getValues();
  }

}
