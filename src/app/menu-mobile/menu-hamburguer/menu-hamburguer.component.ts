import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-menu-hamburguer',
  templateUrl: './menu-hamburguer.component.html',
  styleUrls: ['./menu-hamburguer.component.scss']
})
export class MenuHamburguerComponent implements OnInit {
  @Output() toggleAside = new EventEmitter<any>();

  public isActive: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleActiveMenu() {
    this.isActive = this.isActive == "" ? "active" : "";
    this.toggleAside.emit(this.isActive);
  }

}
