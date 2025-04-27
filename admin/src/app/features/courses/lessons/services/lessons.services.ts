import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Lesson } from "../models/lesson.model";
import { PageMeta } from "../../../../shareds/models/page-meta.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private readonly apiUrl = environment.apiUrl + '/lessons';
  constructor(
    private readonly http: HttpClient,
  ) { }

  createLesson(lesson: Partial<Lesson>): Observable<{ data: Lesson }> {
    return this.http.post<{ data: Lesson }>(this.apiUrl, lesson);
  }

  getLessons(page: number = 1, take: number = 10, searchTerm: string = '', courseId: number): Observable<{ data: Lesson[], meta: PageMeta }> {
    return this.http.get<
      { data: Lesson[], meta: PageMeta }
    >(this.apiUrl + '/course/' + courseId, {
      params: {
        page: page.toString(),
        take: take.toString(),
        searchTerm: searchTerm
      }
    });
  }

  getLastLessonByCourseId(courseId: number): Observable<{ data: Lesson }> {
    return this.http.get<{ data: Lesson }>(`${this.apiUrl}/course/${courseId}/last`);
  }

  getLessonById(id: number): Observable<{ data: Lesson }> {
    return this.http.get<{ data: Lesson }>(`${this.apiUrl}/${id}`);
  }

  updateLesson(id: number, lesson: Partial<Lesson>): Observable<{ data: Lesson }> {
    return this.http.patch<{ data: Lesson }>(`${this.apiUrl}/${id}`, lesson);
  }
}
