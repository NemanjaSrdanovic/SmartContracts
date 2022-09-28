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


    public proposals: any[] = ["A", "B", "C"];
    public selectedProposal: any;
    public username:undefined

    form = new FormGroup({
        proposal: new FormControl('', Validators.required)
    });

    constructor(
        private router: Router,
        private gallery: GalleryService
    ) {
    }

    ngOnInit() {

        //   this.proposals=this.gallery.getProposals()
    }


    sendVote() {

        //   this.gallery.sendProposal(this.selectedProposal)
    }

    public setSelectProposal(selected: any, index: number) {

        this.selectedProposal = {name:  selected, index: index}
    }


}