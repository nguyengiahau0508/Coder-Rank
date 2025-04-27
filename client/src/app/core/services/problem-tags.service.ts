
import { Injectable } from "@angular/core";
import { ProblemTag } from "../models/problem-tag.model";
import { sampleProblemTags } from "../../mock/problem-tags.sample";

@Injectable({
  providedIn: 'root'
})
export class ProblemTagsService {
  private problemTags: ProblemTag[] = sampleProblemTags;

  // Lấy tất cả problem-tag mapping
  getAllProblemTags(): ProblemTag[] {
    return this.problemTags;
  }

  // Lấy danh sách tag theo ID bài toán
  getTagsByProblemId(problemId: number): number[] {
    return this.problemTags
      .filter(pt => pt.problemId === problemId)
      .map(pt => pt.tagId);
  }

  // Lấy danh sách bài toán theo ID tag
  getProblemsByTagId(tagId: number): number[] {
    return this.problemTags
      .filter(pt => pt.tagId === tagId)
      .map(pt => pt.problemId);
  }

  // Thêm một problem-tag mới
  addProblemTag(newProblemTag: ProblemTag): void {
    this.problemTags.push(newProblemTag);
  }

  // Xóa một problem-tag theo problemId và tagId
  removeProblemTag(problemId: number, tagId: number): boolean {
    const initialLength = this.problemTags.length;
    this.problemTags = this.problemTags.filter(
      pt => !(pt.problemId === problemId && pt.tagId === tagId)
    );
    return this.problemTags.length < initialLength;
  }
}

