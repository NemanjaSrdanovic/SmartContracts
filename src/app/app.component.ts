import {Component, ElementRef, ViewChild} from '@angular/core';
import {GalleryService} from "./services/gallery.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dapp';
}
