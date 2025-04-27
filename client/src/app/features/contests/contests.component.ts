import { Component } from '@angular/core';
import { TitleService } from '../../core/services/shared/title.service';
import { ContestListComponent } from './contest-list/contest-list.component';
import { RankingListComponent } from '../../shared/components/ranking-list/ranking-list.component';
import { FeaturedContestsComponent } from './featured-contests/featured-contests.component';
import { NextContestsComponent } from './next-contests/next-contests.component';

@Component({
  selector: 'app-contests',
  imports: [
    ContestListComponent,
    RankingListComponent,
    FeaturedContestsComponent,
    NextContestsComponent
  ],
  templateUrl: './contests.component.html',
  styleUrl: './contests.component.css'
})
export class ContestsComponent {
  constructor(
    private titleService: TitleService
  ) {
    titleService.setTitle('Contests')
  }
}
