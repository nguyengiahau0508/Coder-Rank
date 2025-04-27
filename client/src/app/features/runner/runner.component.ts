
import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, } from "@angular/core";
import { CodeEditorComponent, CodeModel } from "@ngstack/code-editor";
import { FormsModule } from "@angular/forms";
import { TestCaseInputComponent } from "../../shared/components/runner/testcases-input/testcases-input.component";
import { RunnerService } from "../../core/services/runner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TestcaseService } from "../../core/services/testcases.service";
import { TabNavigationComponent } from "../../shared/components/tab-navigation/tab-navigation.component";
import { TitleService } from "../../core/services/shared/title.service";
import { ProblemsService } from "../../core/services/problems.service";
import { Problem } from "../../core/models/problem.model";
import { SubmissionsService } from "../../core/services/submissions.service";
import { SharedService } from "../../core/services/shared/shared.service";
import { User } from "../../core/models/user.model";

export enum TestCaseStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
  TIME_LIMIT_EXCEEDED = 'time_limit_exceeded',
  MEMORY_LIMIT_EXCEEDED = 'memory_limit_exceeded',
  RUNTIME_ERROR = 'runtime_error',
  COMPILATION_ERROR = 'compilation_error',
}
// Interface cho test case
export interface RunnerTestCase {
  order: number;
  input: string;
  expected: string;
  timeLimit?: number; // ms
  memoryLimit?: number; // KB
  output?: string;
  status?: TestCaseStatus;
  executionTime?: number; // ms
  memoryUsed?: number; // KB
  errorMessage?: string;
  expanded?: boolean
}

@Component({
  selector: "app-runner",
  templateUrl: "./runner.componnet.html",
  styleUrls: ["./runner.component.css"],
  standalone: true, imports: [TabNavigationComponent, TestCaseInputComponent, CodeEditorComponent, CommonModule, FormsModule],
})
export class RunnerComponent implements OnInit {
  problem = signal<Problem | null>(null);
  user = signal<User | null>(null)

  testcases: RunnerTestCase[] = [{ order: 0, input: '', expected: '' }]
  testcasesResponseData: RunnerTestCase[] = [];
  theme = "vs-light";
  selectedLanguage = "cpp";
  inputData = "";
  outputData = "";

  isLoading = false; errorMessage = "";
  isSubmittingCode = false

  model: CodeModel = {
    language: "cpp",
    uri: "main.cpp",
    value: `#include <iostream>\nusing namespace std;\nint main() {\n  \n  return 0;\n}`,
  };

  options = {
    contextmenu: true,
    minimap: { enabled: true },
  };

  languages = {
    cpp: {
      language: "cpp",
      uri: "main.cpp",
      value: `#include <iostream>\nusing namespace std;\nint main() {\n  \n\n  return 0;\n}`,
    },
    python: {
      language: "python",
      uri: "main.py",
      value: `x = int(input())\nprint(x * 2)`,
    },
    ts: {
      language: "typescript",
      uri: "main.ts",
      value: `const input: number = parseInt(prompt() || "0");\nconsole.log(input * 2);`,
    },
    java: {
      language: "java",
      uri: "Main.java",
      value: `import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int x = scanner.nextInt();\n    System.out.println(x * 2);\n  }\n}`,
    },
  };

  constructor(
    private runnerService: RunnerService,
    private route: ActivatedRoute,
    private router: Router,
    private testcasesService: TestcaseService,
    private titleService: TitleService,
    private problemService: ProblemsService,
    private submissionService: SubmissionsService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.globalUser$.subscribe(value => {
      this.user.set(value)
    })

    this.titleService.setTitle('Runner');

    const savedCode = localStorage.getItem('code-editor-content');
    if (savedCode) {
      this.model.value = savedCode;
    }

    const problemId: number = Number(this.route.snapshot.paramMap.get('problemId'));
    if (problemId) {
      this.loadProblem(problemId);
      this.loadTestcaseSample(problemId);
    }

  }

  loadProblem(problemId: number) {
    this.problemService.getProblemById(problemId).subscribe({
      next: (response) => {
        this.problem.set(response.data);
        if (this.problem()) {
          this.titleService.setTitle(`${this.problem()!.title} - Submit`);
        }
      },
      error: error => console.log(error),
    });
  }


  loadTestcaseSample(problemId: number) {
    localStorage.removeItem('code-editor-testcases') // Xóa dữ liệu testcases trong localStorage
    this.testcases = []; // Đặt lại mảng testcases về rỗng trước khi thêm mới
    this.testcasesService.getTestCaseSampleByProblemId(problemId).subscribe({
      next: response => {
        const startOrder = this.testcases.length; // Xác định order bắt đầu
        response.data.forEach((testcase, index) => {
          this.testcases.push({
            order: startOrder + index, // Order sẽ tiếp tục từ testcases.length
            input: testcase.input,
            expected: testcase.output,
            expanded: true
          });
        });
      },
      error: error => console.log(error)
    });
  }

  onCodeChanged(value: any) {
    this.model.value = value;
    localStorage.setItem('code-editor-content', value);
  }

  onSelectedLanguage(language: string) {
    if (language === 'cpp')
      this.model = this.languages.cpp
    if (language === 'python')
      this.model = this.languages.python
    if (language === 'java')
      this.model = this.languages.java
    if (language === 'typescript')
      this.model = this.languages.ts
  }

  onTestcaseChanged(testcases: RunnerTestCase[]) {
    this.testcases = testcases
  }

  submitCode() {
    if (!this.user()) {
      this.sharedService.updateGlobalIsOpenningLoginForm(true)
    }
    else {
      this.isSubmittingCode = true
      this.submissionService.submitCode(this.selectedLanguage, this.model.value, this.problem()!.id).subscribe({
        next: (response) => {
          if (response) {
            this.isSubmittingCode = false
            this.router.navigate([`problems/${this.problem()!.id}/history`])
          }
        },
        error: (error) => console.log(error)
      })
    }
  }

  runCode() {
    this.isLoading = true;
    this.errorMessage = "";
    this.outputData = "";

    if (!this.model.value.trim()) {
      this.errorMessage = "Vui lòng nhập mã nguồn!";
      this.isLoading = false;
      return;
    }

    const runMethod = this.selectedLanguage === "cpp" ? this.runnerService.runCpp : this.runnerService.runPython;

    runMethod.call(this.runnerService, this.model.value, this.testcases).subscribe({
      next: (response) => {
        this.outputData = JSON.stringify(response.data, null, 2);
        this.testcasesResponseData = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Lỗi khi chạy code!";
        this.isLoading = false;
      }
    });
  }
}


