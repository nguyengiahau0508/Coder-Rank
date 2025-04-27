import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field'
import { MarkdownModule } from 'ngx-markdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import '@github/markdown-toolbar-element';
import { Submission } from '../../../core/models/submission.model';

@Component({
  selector: 'app-markdown-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldModule,
    FormsModule,
    MarkdownModule,
  ],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})

export class MarkdownEditorComponent {
  @Input() control: FormControl = new FormControl();
  @Input() submission: Submission | undefined = undefined
  @Output() content = new EventEmitter<string>();

  @HostBinding('class.focus') isFocus?: boolean;
  isPreview: boolean = true;
  controlId?: string;

  markdownContent = ''
  constructor() { }

  ngOnInit(): void {
    if (this.submission) {
      this.markdownContent = `# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->

# Code
\`\`\`javascript []
${this.submission.code}
\`\`\`
`;
    }

    this.controlId = `MarkdownEditor-${Math.floor(100000 * Math.random())}`;
    // Gán giá trị ban đầu cho control
    if (!this.control.value) {
      this.control.setValue(this.markdownContent);
    }

    // Theo dõi thay đổi của control và emit nội dung Markdown mới
    this.control.valueChanges.subscribe(value => {
      this.markdownContent = value; // Cập nhật markdownContent
      this.content.emit(value);
    });
    this.content.emit(this.control.value)
  }

  focus() {
    this.isFocus = true;
  }

  blur() {
    this.isFocus = false;
  }

  togglePreview() {
    this.isPreview = !this.isPreview;
  }
}

