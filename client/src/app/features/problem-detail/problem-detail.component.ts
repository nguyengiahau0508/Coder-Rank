import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { Problem } from "../../core/models/problem.model";
import { HtmlViewerComponent } from "../../shared/components/html-viewer/html-viewer.component";
import { Testcase } from "../../core/models/testcase.model";
import { ActivatedRoute } from "@angular/router";
import { ProblemsService } from "../../core/services/problems.service";
import { TestcaseService } from "../../core/services/testcases.service";
import { ProblemSubmissionComponent } from "../../shared/components/submissions/problem-submission/problem-submission.component";
import { ProblemTagsComponent } from "../../shared/components/problems/problem-tag/problem-tag.component";
import { TabNavigationComponent } from "../../shared/components/tab-navigation/tab-navigation.component";
import { TestcaseSampleComponent } from "../../shared/components/testcases/testcase-sample/testcase-sample.component";
import { TitleService } from "../../core/services/shared/title.service";
@Component({
  selector: 'app-problem-detail',
  standalone: true,
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css'],
  imports: [TestcaseSampleComponent, TabNavigationComponent, ProblemTagsComponent, ProblemSubmissionComponent, CommonModule, HtmlViewerComponent]
})
export class ProblemDetailComponent implements OnInit {
  problem = signal<Problem | null>(null);
  testcases = signal<Testcase[] | null>(null)
  totalTestcase = signal<number>(0)
  isCopied: boolean = false

  constructor(
    private route: ActivatedRoute,
    private problemsService: ProblemsService,
    private testcasesService: TestcaseService,
    private titleService: TitleService
  ) {
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);
    if (problemId) {
      this.loadProblem(problemId)
      this.loadTestcaseSample(problemId)
      this.loadTotalTestcase(problemId)
    }
  }

  loadProblem(problemId: number) {
    this.problemsService.getProblemById(problemId).subscribe(response => {
      this.problem.set(response.data)
      if (this.problem()) {
        this.titleService.setTitle(this.problem()!.title)
      }
    })
  }

  loadTestcaseSample(problemId: number) {
    this.testcasesService.getTestCaseSampleByProblemId(problemId).subscribe({
      next: (response) => {
        this.testcases.set(response.data)
      },
      error: (error) => console.log(error)
    })
  }

  loadTotalTestcase(problemId: number) {
    this.testcasesService.getTotalTestcaseByProblemId(problemId).subscribe({
      next: response => {
        this.totalTestcase.set(response.data)
      }
    })
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(() => {
      this.isCopied = true
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });

    setTimeout(() => this.isCopied = false, 1000)
  }
}
