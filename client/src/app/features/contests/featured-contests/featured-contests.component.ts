import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-featured-contests',
  standalone: true,
  templateUrl: './featured-contests.component.html',
  styleUrls: ['./featured-contests.component.css'],
})
export class FeaturedContestsComponent {
  contests = signal([
    {
      id: 291,
      title: 'Weekly Contest 291',
      endDate: 'May 1, 2022',
      image: 'images/contests/card_img_1654267951.png',
      sponsor: 'LeetCode'
    },
    {
      id: 290,
      title: 'Weekly Contest 290',
      endDate: 'Apr 24, 2022',
      image: 'images/contests/card_img_1654267980.png',
      sponsor: 'LeetCode'
    },
    {
      id: 85,
      title: 'Biweekly Contest 85',
      endDate: 'Aug 20, 2022',
      image: 'images/contests/card_img_1659801683.png',
      sponsor: 'HESAI'
    },
  ]);
}
