import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  public url: string = "";

  constructor(private router: Router, private rute: ActivatedRoute) {
    this.url = this.router.url.substring(1,this.router.url.length);
  }

  ngOnInit(): void {
  }

}
