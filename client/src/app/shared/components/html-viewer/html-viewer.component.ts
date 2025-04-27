import { AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HtmlViewerComponent implements AfterViewInit {
  private _content = '';
  safeContent: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private elRef: ElementRef<HTMLElement>
  ) { }

  @Input()
  set content(value: string) {
    this._content = value;
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  get content(): string {
    return this._content;
  }

  ngAfterViewInit(): void {
    const el = this.elRef.nativeElement;
    const oembeds = el.querySelectorAll('oembed[url]');

    oembeds.forEach((node) => {
      const url = node.getAttribute('url');
      if (url && url.includes('youtube.com')) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '400');
        iframe.setAttribute('src', this.convertToEmbedUrl(url));
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        node.replaceWith(iframe);
      }
    });
  }

  private convertToEmbedUrl(url: string): string {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : '';
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

