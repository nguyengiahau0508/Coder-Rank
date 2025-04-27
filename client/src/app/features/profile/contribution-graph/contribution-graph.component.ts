
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Submission } from '../../../core/models/submission.model';
import { SubmissionsService } from '../../../core/services/submissions.service';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contribution-graph.component.html',
  styles: []
})
export class ContributionGraphComponent implements OnInit {
  submissions = signal<Submission[]>([]);

  selectedYear = new Date().getFullYear();
  years = Array.from({ length: 3 }, (_, i) => this.selectedYear - i);
  months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  days: { date: Date, activity: number }[] = [];
  totalSubmissions = 0;
  activeDays = 0;
  maxStreak = 0;

  constructor(
    private readonly submissionsService: SubmissionsService
  ) {
  }

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.submissionsService.getAllSubmissionInYear(this.selectedYear)
      .subscribe({
        next: (res) => {
          this.submissions.set(res.data);
          this.updateGraph();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  updateGraph() {
    this.days = [];
    this.totalSubmissions = 0;
    this.activeDays = 0;
    this.maxStreak = 0;

    // Tạo một bản đồ (Map) để đếm số bài nộp theo ngày
    const activityMap = new Map<string, number>();
    this.submissions().forEach(submission => {
      const date = new Date(submission.createdAt);
      // Chuẩn hóa ngày (bỏ giờ/phút/giây)
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      activityMap.set(dateKey, (activityMap.get(dateKey) || 0) + 1);
    });

    // Tạo dữ liệu cho tất cả các ngày trong năm
    const startDate = new Date(this.selectedYear, 0, 1); // 1/1/year
    const endDate = new Date(this.selectedYear, 11, 31); // 31/12/year
    let currentStreak = 0;
    let maxStreak = 0;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      const activity = activityMap.get(dateKey) || 0;

      // Thêm ngày vào mảng days
      this.days.push({ date: new Date(d), activity });

      // Cập nhật các thông số
      this.totalSubmissions += activity;
      if (activity > 0) {
        this.activeDays++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    this.maxStreak = maxStreak;
  }

  getDaysInMonth(month: number): { date: Date, activity: number }[] {
    return this.days.filter(day => day.date.getMonth() === month);
  }

  getDayClass(activity: number): string {
    if (activity === 0) return 'bg-gray-200';
    if (activity === 1) return 'bg-teal-200';
    if (activity === 2) return 'bg-teal-400';
    if (activity === 3) return 'bg-teal-600';
    return 'bg-teal-800';
  }
}

