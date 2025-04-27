import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tag } from "../models/tag.models";

@Injectable({
  providedIn: "root",
})
export class TagsService {
  private readonly apiUrl = environment.apiUrl + "/tags";
  constructor(
    private readonly http: HttpClient,
  ) { }

  getTags(): Observable<{ data: Tag[] }> {
    return this.http.get<{ data: Tag[] }>(`${this.apiUrl}`);
  }
}
