import {Component, signal} from '@angular/core';
import {SolutionBlogComponent} from '../../shared/components/solutions/solution-blog/solution-blog.component';
import {Solution} from '../../core/models/solutions.model';
import {SolutionsService} from '../../core/services/solutions.service';
import {ActivatedRoute} from '@angular/router';
import {CommentSectionComponent} from '../../shared/components/solutions/comments/comment-section/comment-section.component';
import {SolutionCommentService} from '../../core/services/solution-comments.service';
import {TabNavigationComponent} from '../../shared/components/tab-navigation/tab-navigation.component';
import {Comment} from '../../core/models/comment.model';
import {CommentsService} from '../../core/services/comments.service';

@Component({
  selector: 'app-problem-solution-detail',
  imports: [TabNavigationComponent, SolutionBlogComponent, CommentSectionComponent],
  templateUrl: './problem-solution-detail.component.html',
  styleUrl: './problem-solution-detail.component.css',
  standalone: true,
})
export class ProblemSolutionDetailComponent {
  solution?: Solution
  comments = signal<Comment[]>([])
  constructor(
    private route: ActivatedRoute,
    private solutionsService: SolutionsService,
    private solutionCommentsService: SolutionCommentService,
    private readonly commentsService: CommentsService
  ) {
    this.loadSolutionDetail()
    this.loadComments()
  }

  loadSolutionDetail() {
    const solutionId: number = Number(this.route.snapshot.paramMap.get('solutionId')!);
    this.solutionsService.getSolutionDetailById(solutionId).subscribe({
      next: (res) => {
        this.solution = res.data
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  loadComments() {
    const solutionId: number = Number(this.route.snapshot.paramMap.get('solutionId')!);
    this.commentsService.getCommentsBySolutionId(1, 10, solutionId).subscribe({
      next: res => {
        this.comments.set(res.data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onRefreshComment() {
    // const solutionId: number = Number(this.route.snapshot.paramMap.get('solutionId')!);
    // this.solutionCommentsService.getRootCommentsBySolution(solutionId).subscribe((response: SolutionComment[]) => {
    //   this.comments = response
    // })
    this.loadComments()
  }
}
