import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Problem } from "../../../../core/models/problem.model";
import { ProblemTagsComponent } from "../problem-tag/problem-tag.component";
import { CommonModule } from "@angular/common";
import { SubmissionsService } from "../../../../core/services/submissions.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
  standalone: true,
  imports: [ProblemTagsComponent, CommonModule, RouterLink]
})
export class ProblemListComponent {
  @Input({ required: true }) problems?: Problem[]
  @Output() tagId = new EventEmitter<number>()

  private submissionsService = inject(SubmissionsService);

  getSubmissionCount(problemId: number): number {
    return this.submissionsService.getSubmissionCountByProblemId(problemId);
  }

  onTagSelected(tagId: number) {
    this.tagId.emit(tagId)
  }
}
