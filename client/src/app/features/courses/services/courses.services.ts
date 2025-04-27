import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../models/course.model";
import { environment } from "../../../../environments/environment";
import { PageMeta } from "../../../core/models/page-meta.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly apiUrl = environment.apiUrl + "/courses";

  constructor(
    private readonly http: HttpClient
  ) { }



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

}
