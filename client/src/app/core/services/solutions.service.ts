
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Solution } from '../models/solutions.model';
import { sampleSolutions } from '../../mock/solutions.sample';
import { PageMeta } from '../models/page-meta.model';
import { Tag } from '../models/tag.model';
import { SolutionTagsService } from './solution-tags.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  private solutions: Solution[] = sampleSolutions
  private readonly apiUrl = environment.apiUrl + '/solutions';

  constructor(
    private solutionTagsService: SolutionTagsService,
    private readonly http: HttpClient
  ) { }

  createSolution(solution: Partial<Solution>): Observable<
    {
      data: Solution;
    }
  > {
    return this.http.post<
      {
        data: Solution;
      }
    >(this.apiUrl, solution, { withCredentials: true });
  }


  getSolutions(
    page: number = 1,
    take: number = 10,
    problemId: number,
    tags?: Tag[],
    sortBy: 'votes' | 'views' | 'createdAt' = 'createdAt'
  ): Observable<{ data: Solution[], meta: PageMeta }> {
    const tagIds: number[] = tags?.map(tag => tag.id) || [];

    let params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString())
      .set('problemId', problemId.toString())
      .set('sortBy', sortBy);

    tagIds.forEach(id => {
      params = params.append('tagIds', id);
    });

    return this.http.get<{
      data: Solution[],
      meta: PageMeta
    }>(this.apiUrl, { params });
  }

  getSolutionDetailById(id: number): Observable<{ data: Solution }> {
    return this.http.get<{ data: Solution }>(`${this.apiUrl}/${id}`);
  }

  getSolutionsByProblemId(
    problemId: number,
    page: number = 1,
    pageSize: number = 10,
    tags?: Tag[],
    sortBy: "votes" | "views" | "createdAt" = "createdAt", // Mặc định sắp xếp theo mới tạo
    isDescending: boolean = true // Mặc định giảm dần
  ): Observable<{ data: Solution[], meta: PageMeta }> {
    // Lọc solutions theo problemId
    let filteredSolutions = this.solutions.filter(solution => solution.problem.id === problemId);

    // Lọc theo tags nếu có
    if (tags?.length) {
      filteredSolutions = filteredSolutions.filter(solution =>
        tags.some(tag =>
          this.solutionTagsService.getTagIdsBySolutionId(solution.id).includes(tag.id)
        )
      );
    }

    // Sắp xếp theo tiêu chí được chọn
    const factor = isDescending ? -1 : 1;
    filteredSolutions.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1) * factor);

    // Tính tổng số phần tử sau khi lọc
    const totalItems = filteredSolutions.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Cắt dữ liệu theo trang
    const startIndex = (page - 1) * pageSize;
    const data = filteredSolutions
      .slice(startIndex, startIndex + pageSize)
      .map(({ content, ...rest }) => rest); // Loại bỏ content

    // Metadata cho phân trang
    const meta: PageMeta = {
      page,
      take: pageSize,
      itemCount: totalItems,
      pageCount: totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };

    return of({ data, meta });
  }



  /**
   * Lấy thông tin chi tiết của một solution theo ID
   */
  getSolutionById(id: number): Observable<Solution | undefined> {
    return of(this.solutions.find((s) => s.id === id));
  }
}

