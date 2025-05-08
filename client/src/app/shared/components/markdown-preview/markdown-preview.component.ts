
import { Component, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrl: './markdown-preview.component.css',
  imports: [MarkdownModule],
  standalone: true,
})
export class MarkdownPreviewComponent implements OnChanges {
  @Input({ required: true }) content: string = ``;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.cdr.detectChanges();
    }
  }
}

