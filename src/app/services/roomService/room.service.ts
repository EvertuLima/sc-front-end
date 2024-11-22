import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8000/room/api';

  constructor(private http: HttpClient) { }

  getAllRooms() : Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.apiUrl)
  }

  postRoom(room: RoomModel) : Observable<RoomModel> {
    return this.http.post<RoomModel>(`${this.apiUrl}/`, room)
  }
}
