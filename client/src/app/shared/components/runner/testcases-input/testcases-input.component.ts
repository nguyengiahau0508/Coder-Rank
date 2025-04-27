import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RunnerTestCase } from '../../../../features/runner/runner.component';
@Component({
  selector: 'app-testcases-input',
  templateUrl: './testcases-input.component.html',
  styleUrls: ['./testcases-input.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TestCaseInputComponent implements OnChanges, OnInit {
  @Output() onChangeTestcase = new EventEmitter<RunnerTestCase[]>();
  @Input({ required: true }) resultTest!: RunnerTestCase[];
  @Input({ required: true }) isLoading!: boolean

  public testcases: RunnerTestCase[] = [{ order: 0, input: '', expected: '', expanded: true }];
  public showContent: boolean = false;

  constructor() {
    const savedTestCases = localStorage.getItem('code-editor-testcases');
    if (savedTestCases) {
      this.testcases = JSON.parse(savedTestCases);
    }
  }

  ngOnInit() {
    this.onChangeTestcase.emit(this.testcases); // Phát emit ngay khi component khởi tạo
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resultTest'] && this.resultTest.length > 0) {
      this.testcases = [...this.resultTest];
      this.resultTest = [];
    }
  }

  addTestCase() {
    this.testcases.push({
      order: this.testcases.length,
      input: '',
      expected: '',
      expanded: true
    });
    localStorage.setItem('code-editor-testcases', JSON.stringify(this.testcases));
    this.onChangeTestcase.emit(this.testcases);
  }

  onToggleTestCase(index: number) {
    this.testcases[index].expanded = !this.testcases[index].expanded;
  }

  removeTestCase(order: number) {
    this.testcases = this.testcases.filter(tc => tc.order !== order);
    this.reorderTestCases();
    localStorage.setItem('code-editor-testcases', JSON.stringify(this.testcases));
    this.onChangeTestcase.emit(this.testcases);
  }

  onInputChange(event: Event, order: number, field: 'input' | 'expected') {
    const target = event.target as HTMLInputElement;
    const testCase = this.testcases.find(tc => tc.order === order);
    if (testCase) {
      testCase[field] = target.value;
    }
    this.onChangeTestcase.emit(this.testcases);
    localStorage.setItem('code-editor-testcases', JSON.stringify(this.testcases));
  }

  reorderTestCases() {
    this.testcases.forEach((testCase, index) => {
      testCase.order = index;
    });
  }

  getTestCases() {
    return this.testcases;
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
  }
}

