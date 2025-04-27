import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private baseTitle = 'Codersrank';

  constructor(private title: Title) { }

  setTitle(pageTitle: string) {
    this.title.setTitle(`${pageTitle} - ${this.baseTitle}`);
  }
}
