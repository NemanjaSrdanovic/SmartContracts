import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChairPersonComponent} from "./components/chair-person/chair-person.component";
import {VotingComponent} from "./components/voting-component/voting.component";

const routes: Routes = [
  {'path': '', redirectTo: 'chair-person', pathMatch: 'full'},
  {'path': 'chair-person', component: ChairPersonComponent},
  {'path': 'vote', component: VotingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
