import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TabNavigationComponent } from '../../shared/components/tab-navigation/tab-navigation.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SubmissionsService } from '../../core/services/submissions.service';
import { Status, Submission } from '../../core/models/submission.model';
import { PageMeta } from '../../core/models/page-meta.model';
import { ProblemsService } from '../../core/services/problems.service';
import { UsersService } from '../../core/services/users.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TitleService } from '../../core/services/shared/title.service';

@Component({
  selector: 'app-problem-status',
  imports: [RouterLink, PaginationComponent, DatePipe, TabNavigationComponent],
  templateUrl: './problemset-status.component.html',
  styleUrl: './problemset-status.component.css'
})
export class ProblemsetStatusComponent implements OnInit {
  submission = signal<Submission[]>([])
  meta = signal<PageMeta>({
    page: 1, take: 20, itemCount: 0, pageCount: 0, hasNextPage: false, hasPreviousPage: false
  })

  constructor(
    private submissionsService: SubmissionsService,
    private problemsService: ProblemsService,
    private usersService: UsersService,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Problemset - Status')
  }

  ngOnInit(): void {
    this.loadSumbssion()
  }

  loadSumbssion() {
    this.submissionsService.getAllSubmission(this.meta().page, this.meta().take).subscribe({
      next: (response) => {
        this.submission.set(response.data)
        this.meta.set(response.meta)
      },
      error: error => console.log(error)
    })
  }

  public onPageChange(page: number) {
    this.meta.set({
      ...this.meta(),
      page: page
    })
    this.loadSumbssion()
  }

  getUsername(userId: number): Observable<string | undefined> {
    return this.usersService.getUsernameById(userId);
  }

  getTitleProblem(problemId: number) {
    return this.problemsService.getProblemTitleById(problemId) || ''
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case Status.PENDING: return 'Pending';
      case Status.ACCEPTED: return 'Accepted';
      case Status.WRONG_ANSWER: return 'Wrong Answer';
      case Status.TIME_LIMIT_EXCEEDED: return 'Time Limit Exceeded';
      case Status.MEMORY_LIMIT_EXCEEDED: return 'Memory Limit Exceeded';
      case Status.RUNTIME_ERROR: return 'Runtime Error';
      case Status.COMPILATION_ERROR: return 'Compilation Error';
      default: return status;
    }
  }

  public getLanguageDisplay(lang: string): string {
    const langMap: { [key: string]: string } = {
      cpp: 'C++',
      python: 'Python',
      java: 'Java',
      javascript: 'JavaScript'
    };
    return langMap[lang] || lang;
  }
}
