import {Component, ElementRef, ViewChild} from '@angular/core';
import {GalleryService} from "./services/gallery.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dapp';
  public receivedNumber: number;

  @ViewChild('num') abc: ElementRef;

  constructor(private galleryService: GalleryService) {
  }

  async getNumber() {
     this.receivedNumber = await this.galleryService.getNumber();
  }

  setNumber() {
    return this.galleryService.addNumber(this.abc.nativeElement.value)
  }
}
