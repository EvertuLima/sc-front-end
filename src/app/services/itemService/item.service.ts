import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemModel } from '../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:8000/component/api';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(this.apiUrl);
  }

  postItem(item: ItemModel): Observable<ItemModel> {
    return this.http.post<ItemModel>(`${this.apiUrl}/`, item);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}/`);
  }

  updateItem(
    itemId: number,
    updatedData: Partial<ItemModel>
  ): Observable<ItemModel> {
    return this.http.patch<ItemModel>(`${this.apiUrl}/${itemId}/`, updatedData);
  }
}
