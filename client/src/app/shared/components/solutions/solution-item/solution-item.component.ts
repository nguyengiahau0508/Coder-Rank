import { Component, Input, OnInit } from '@angular/core';
import { Solution } from '../../../../core/models/solutions.model';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';
import { Tag } from '../../../../core/models/tag.model';
import { SolutionTagsService } from '../../../../core/services/solution-tags.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solution-item',
  templateUrl: './solution-item.component.html',
  styleUrls: ['./solution-item.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class SolutionItemComponent implements OnInit {
  @Input() solution!: Solution;
  tags: Tag[] = []

  constructor(
    private usersService: UsersService,
    private solutionTagsService: SolutionTagsService
  ) { }

  ngOnInit(): void {
    this.solutionTagsService.getTagsBySolutionId(this.solution.id).subscribe((response: Tag[]) => {
      this.tags = response
    })
  }

  getUsername(userId: number): Observable<string | undefined> {
    return this.usersService.getUsernameById(userId);
  }

  getName(userId: number): Observable<string | undefined> {
    return this.usersService.getNameById(userId);
  }

  getAvatar(userId: number): Observable<string | undefined> {
    return this.usersService.getAvartaById(userId);
  }
}

