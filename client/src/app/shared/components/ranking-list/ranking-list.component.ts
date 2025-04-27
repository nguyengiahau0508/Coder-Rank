import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-ranking-list',
  standalone: true,
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css'],
})
export class RankingListComponent {
  rankings = signal([
    { rank: 1, username: 'fizzqq2002', rating: 3703, attended: 26, country: 'US', icon: '👤' },
    { rank: 2, username: 'NealWu', rating: 3868, attended: 51, country: 'US', icon: '⚡' },
    { rank: 3, username: 'Yawn_Sean', rating: 3645, attended: 84, country: 'US', icon: '👤' },
    { rank: 4, username: '小明哥哥', rating: 3611, attended: 107, country: 'CN', icon: '👤' },
    { rank: 5, username: '孙高', rating: 3599, attended: 146, country: 'CN', icon: 'H' },
    { rank: 6, username: 'Joshua_Chen', rating: 3599, attended: 100, country: 'CN', icon: '👤' },
    { rank: 7, username: 'PylsbBestLang', rating: 3599, attended: 81, country: 'CN', icon: '🐍' },
    { rank: 8, username: 'tiger2005', rating: 3599, attended: 131, country: 'CN', icon: '🌟' },
    { rank: 9, username: 'jonathannivings', rating: 3513, attended: 96, country: 'SG', icon: '👤' },
    { rank: 10, username: 'Rohin Garg', rating: 3506, attended: 88, country: 'IN', icon: 'R' },
  ]);

  getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
}
