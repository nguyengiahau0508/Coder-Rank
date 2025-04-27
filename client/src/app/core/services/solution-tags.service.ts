import { Injectable } from "@angular/core";
import { sampleSolutionTags } from "../../mock/solution-tags.sample";
import { SolutionTag } from "../models/solution-tags.model";
import { TagsService } from "./tags.service";
import { Observable, of } from "rxjs";
import { Tag } from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class SolutionTagsService {
  private solutionTags: SolutionTag[] = sampleSolutionTags

  constructor(private readonly tagsService: TagsService) { }

  getTagIdsBySolutionId(solutionId: number) {
    return this.solutionTags.filter(st => st.solutionId === solutionId)
      .map(st => st.tagId)
  }

  getTagsBySolutionId(solutionId: number): Observable<Tag[]> {
    return of(
      this.solutionTags
        .filter(st => st.solutionId === solutionId)
        .map(st => this.tagsService.getTagById(st.tagId))
        .filter(Boolean) as Tag[] // Loại bỏ undefined
    );
  }

  isExistSolutionTag(solutionId: number, tagId: number): boolean {
    return this.solutionTags.some(st => st.tagId === tagId && st.solutionId === solutionId);
  }
}
