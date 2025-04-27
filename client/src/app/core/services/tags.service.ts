import { Injectable } from "@angular/core";
import { Tag } from "../models/tag.model";
import { sampleTags } from "../../mock/tags.sample";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly apiUrl = environment.apiUrl + "/tags";
  constructor(
    private readonly http: HttpClient,
  ) { }

  getTags(): Observable<{ data: Tag[] }> {
    return this.http.get<{ data: Tag[] }>(`${this.apiUrl}`);
  }

  private tags: Tag[] = sampleTags;

  // Lấy tất cả tag
  getAllTags(): Tag[] {
    return this.tags;
  }

  // Tìm tag theo ID
  getTagById(id: number): Tag | undefined {
    return this.tags.find(tag => tag.id === id);
  }

  // Tìm tag theo tên
  getTagByName(name: string): Tag | undefined {
    return this.tags.find(tag => tag.name.toLowerCase() === name.toLowerCase());
  }

  addTag(newTag: Omit<Tag, "id"> & { id?: number }): void {
    if (!this.getTagByName(newTag.name)) {
      const id = newTag.id ?? this.generateId(); // Nếu newTag có id thì giữ nguyên, nếu không thì tạo mới
      this.tags.push({ id, name: newTag.name });
    }
  }

  // Xóa tag theo ID
  removeTag(id: number): boolean {
    const initialLength = this.tags.length;
    this.tags = this.tags.filter(tag => tag.id !== id);
    return this.tags.length < initialLength;
  }

  // Cập nhật tên tag
  updateTag(id: number, newName: string): boolean {
    const tag = this.getTagById(id);
    if (tag) {
      tag.name = newName;
      return true;
    }
    return false;
  }

  // Tạo ID mới (giả lập auto-increment)
  private generateId(): number {
    return this.tags.length > 0 ? Math.max(...this.tags.map(tag => tag.id)) + 1 : 1;
  }
}

