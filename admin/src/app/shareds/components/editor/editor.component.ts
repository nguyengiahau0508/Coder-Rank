
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    FormsModule,
    NgxEditorModule
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() text: string = ''; // <-- sửa thành Input
  @Input() editor = new Editor();
  @Output() htmlContent = new EventEmitter<string>();

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Gửi dữ liệu lên component cha mỗi khi thay đổi
  onTextChange(): void {
    this.htmlContent.emit(this.text);
  }
}

