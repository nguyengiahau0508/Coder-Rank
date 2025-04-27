import { Component, Input } from '@angular/core';
import { Language, Submission } from '../../../../core/models/submission.model';
import { DatePipe } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-submission-detail',
  imports: [
    DatePipe,
    HighlightModule
  ],
  templateUrl: './submission-detail.component.html',
  styleUrl: './submission-detail.component.css'
})
export class SubmissionDetailComponent {
  @Input({ required: true }) submission!: Submission

  getLanguageString(language: Language): string {
    switch (language) {
      case Language.CPP: return 'cpp';
      case Language.PYTHON: return 'python';
      case Language.JAVA: return 'java';
      case Language.JAVASCRIPT: return 'javascript';
      default: return 'plaintext';
    }
  }
}
