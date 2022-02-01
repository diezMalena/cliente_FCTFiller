import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public imgLogo: string;

  constructor() {
    this.imgLogo="./assets/images/logo.png";
   }

  ngOnInit(): void {

  }

}
