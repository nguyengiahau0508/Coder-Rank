import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { Testcase } from '../models/testcase.model';
import { TestCaseService } from '../services/testcase.service';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Output() cancel = new EventEmitter<void>();
  @Input({ required: true }) testcase = signal<Testcase | null>({
    id: -1,
    input: '',
    output: '',
    isSample: false,
    problem: { id: -1 }
  })

  isLoading = signal(false);

  constructor(
    private readonly testcaseService: TestCaseService,
  ) { }

  onSubmit() {
    this.isLoading.set(true);
    this.testcaseService.updateTestCase(this.testcase()!.id!, this.testcase()!).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.cancel.emit();
      },
      error: () => {
        this.isLoading.set(false);
        alert('Failed to create test case');
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
