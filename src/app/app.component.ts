import {Component, ElementRef, ViewChild} from '@angular/core';
import {GalleryService} from "./services/gallery.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dapp';

  constructor(public activeRoute: ActivatedRoute) {
    console.log(activeRoute.snapshot);
  }

  getPathName() {
    return window.location.pathname;
  }
}
