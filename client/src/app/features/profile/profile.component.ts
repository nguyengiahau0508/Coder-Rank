import { Component } from '@angular/core';
import { ContributionGraphComponent } from './contribution-graph/contribution-graph.component';
import { RankingTableComponent } from './ranking-table/ranking-table.component';

@Component({
  selector: 'app-profile',
  imports: [
    ContributionGraphComponent,
    RankingTableComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
