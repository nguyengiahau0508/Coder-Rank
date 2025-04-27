import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../models/course.model";
import { PageMeta } from "../../../shareds/models/page-meta.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly apiUrl = environment.apiUrl + "/courses";

  constructor(
    private readonly http: HttpClient
  ) { }

  createCourse(course: Partial<Course>, file?: File): Observable<{ data: Course }> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(course));
    if (file) {
      formData.append("file", file);
    }

    return this.http.post<{ data: Course }>(this.apiUrl, formData);
  }

  getAllCourses(page: number = 1, take: number = 10, searchTerm: string = ""): Observable<{ data: Course[], meta: PageMeta }> {
    const params = {
      page: page.toString(),
      take: take.toString(),
      searchTerm: searchTerm
    };
    return this.http.get<{ data: Course[], meta: PageMeta }>(this.apiUrl, { params });
  }

  getCourseById(id: string): Observable<{ data: Course }> {
    return this.http.get<{ data: Course }>(`${this.apiUrl}/${id}`);
  }

  updateCourse(id: number, course: Partial<Course>, file?: File): Observable<{ data: Course }> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(course));
    if (file) {
      formData.append("file", file);
    }

    return this.http.patch<{ data: Course }>(`${this.apiUrl}/${id}`, formData);
  }
}
