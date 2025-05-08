import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';
import {MarkdownModule} from 'ngx-markdown';
import {Solution} from '../../../../core/models/solutions.model';
import {Tag} from '../../../../core/models/tag.model';
import {SolutionTagsService} from '../../../../core/services/solution-tags.service';
import {UsersService} from '../../../../core/services/users.service';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-solution-blog',
  imports: [MarkdownModule, DatePipe],
  templateUrl: './solution-blog.component.html',
  styleUrl: './solution-blog.component.css',
  standalone: true
})
export class SolutionBlogComponent implements OnInit {
  @Input() solution!: Solution;
  tags: Tag[] = []

  constructor(
    private sanitizer: DomSanitizer,
    private solutionTagsService: SolutionTagsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.solutionTagsService.getTagsBySolutionId(this.solution.id).subscribe((response: Tag[]) => {
      this.tags = response
    })
  }

  get sanitizedHtml(): SafeHtml {
    const rawHtml = marked(this.solution.content || '') as string;
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  getUsername(userId: number): Observable<string | undefined> {
    return this.usersService.getUsernameById(userId);
  }

  getName(userId: number): Observable<string | undefined> {
    return this.usersService.getNameById(userId);
  }

  getAvatar(userId: number): Observable<string | undefined> {
    return this.usersService.getAvartaById(userId);
  }

}
