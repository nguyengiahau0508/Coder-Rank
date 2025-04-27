import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { Testcase } from '../models/testcase.model';
import { TestCaseService } from '../services/testcase.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
    LoadingComponent,
    FormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() cancel = new EventEmitter<void>();

  testcase = signal<Testcase>({
    input: '',
    output: '',
    isSample: false,
    problem: { id: -1 }
  });

  isLoading = signal(false);

  constructor(
    private readonly testcaseService: TestCaseService,
    private readonly route: ActivatedRoute
  ) { }

  onSubmit() {
    this.isLoading.set(true);
    this.testcase().problem!.id = Number(this.route.snapshot.params['problemId']);
    this.testcaseService.createTestCase(this.testcase()).subscribe({
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
