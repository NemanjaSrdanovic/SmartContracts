import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GalleryService} from "../../services/gallery.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'voting-component',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})


export class VotingComponent implements OnInit {


    public pollName: string;
    public proposals: any[] = [];
    public selectedProposal: any;
    public username: string;

    form = new FormGroup({
        proposal: new FormControl('', Validators.required)
    });

    constructor(
        private router: Router,
        private gallery: GalleryService
    ) {
    }

    ngOnInit() {
        this.getProposals();
    }

    async getProposals() {
        this.pollName = await this.gallery.getPollName();
        this.proposals = await this.gallery.getProposals();
    }


    sendVote() {
        this.gallery.addVote(this.username, this.selectedProposal.index);
    }

    public setSelectProposal(selected: any, index: number) {
        this.selectedProposal = {name:  selected, index: index}
    }


}