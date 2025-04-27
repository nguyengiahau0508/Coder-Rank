import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../core/services/shared/shared.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-tab-navigation',
  imports: [RouterLink],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.css'
})
export class TabNavigationComponent implements OnInit {
  @Input() problemId?: number;
  @Input() hasProblem: boolean = false;
  @Input() hasSubmit: boolean = false;
  @Input() hasRunner: boolean = false;
  @Input() hasStatus: boolean = false;
  @Input() hasHistory: boolean = false;
  @Input() hasSolution: boolean = false;

  user = signal<User | null>(null)

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.globalUser$.subscribe(value => this.user.set(value))
  }
}
