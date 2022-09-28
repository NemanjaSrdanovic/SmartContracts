import {Component, DoCheck, ElementRef, ViewChild} from '@angular/core';
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'app-chair-person',
  templateUrl: './chair-person.component.html',
  styleUrls: ['./chair-person.component.scss']
})
export class ChairPersonComponent implements DoCheck {

  public pollActive: boolean;

  @ViewChild('optionName') optionName: ElementRef;

  public options: string[] = [];
  public proposals: any[] = [];
  public votes: any[] = [];

  private polling: boolean;

  constructor(private galleryService: GalleryService) {
  }

  ngDoCheck(): void {
    if (!this.polling) {
      this.pollAll();
    }
  }

  addOption() {
    if (this.optionName.nativeElement.value) {
      this.options.push(this.optionName.nativeElement.value);
      this.optionName.nativeElement.value = null;
    }
    this.optionName.nativeElement.focus();
  }

  async pollAll() {
    this.polling = true;
    try {
      this.pollActive = await this.galleryService.getPollActive();
      if (this.pollActive) {
        this.proposals = await this.galleryService.getProposalsWithVotes();
        this.votes = await this.galleryService.getVotes();
      }
    } catch (error) {
      alert('Error:' + error);
    }
    setTimeout(() => {
      this.polling = false;
    }, 5000);
  }

  getName(index: number) {
    return this.proposals[index].name;
  }

  async startPoll() {
    try {
      await this.galleryService.startPoll(this.options);
    } catch (error) {
      alert('Error:' + error);
    }
  }

  async closePoll() {
    try {
      await this.galleryService.closePoll();
      this.pollActive = false;
    } catch (error) {
      alert('Error:' + error);
    }
  }
}
