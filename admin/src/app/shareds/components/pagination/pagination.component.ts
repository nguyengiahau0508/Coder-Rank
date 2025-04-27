
import { Component, EventEmitter, Input, Output, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  standalone: true
})
export class PaginationComponent {
  @Input() totalItems: number = 0;   // Tổng số items
  @Input() itemsPerPage: number = 10; // Số items mỗi trang
  @Input() currentPage: number = 1;  // Trang hiện tại
  @Output() pageChange = new EventEmitter<number>();

  constructor() {
  }

  // Tính tổng số trang (computed để cập nhật tự động)
  totalPages = computed(() => Math.ceil(this.totalItems / this.itemsPerPage));

  // Lấy danh sách số trang
  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  // Chuyển trang
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  // Trang trước
  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  // Trang tiếp theo
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
}

