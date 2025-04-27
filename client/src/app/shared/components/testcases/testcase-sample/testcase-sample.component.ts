import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Testcase } from '../../../../core/models/testcase.model';

@Component({
  selector: 'app-testcase-sample',
  imports: [],
  templateUrl: './testcase-sample.component.html',
  styleUrl: './testcase-sample.component.css'
})
export class TestcaseSampleComponent {
  @Input({ required: true }) testcase!: Testcase
  @Output() coppy = new EventEmitter<string>()

  isInputCopied: boolean = false;
  isOutputCopied: boolean = false;

  copyInputToClipboard(content: string) {
    this.coppy.emit(content)
    this.isInputCopied = true;

    setTimeout(() => this.isInputCopied = false, 1000)
  }

  copyOutputToClipboard(content: string) {
    this.coppy.emit(content)
    this.isOutputCopied = true;

    setTimeout(() => this.isOutputCopied = false, 1000)
  }
}
