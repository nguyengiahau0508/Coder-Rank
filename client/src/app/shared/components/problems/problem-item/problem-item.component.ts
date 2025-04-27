import { Component, Input } from "@angular/core";
import { Problem } from "../../../../core/models/problem.model";
import { ProblemTagsComponent } from "../problem-tag/problem-tag.component";

@Component({
  selector: 'app-problem-item',
  standalone: true,
  templateUrl: './problem-item.component.html',
  styleUrls: ['./problem-item.component.css'],
  imports: [ProblemTagsComponent]
})
export class ProblemItemComponent {

  @Input({ required: true }) problem!: Problem
}
