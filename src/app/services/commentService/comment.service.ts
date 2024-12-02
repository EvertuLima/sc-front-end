import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/comment/api';

  constructor(private http: HttpClient) {}

  getAllComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.apiUrl}/`);
  }

  postComment(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.apiUrl}/`, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}/`);
  }

  updadateComment(
    commentId: number,
    updateData: Partial<CommentModel>
  ): Observable<CommentModel> {
    return this.http.patch<CommentModel>(
      `${this.apiUrl}/${commentId}/`,
      updateData
    );
  }
}
