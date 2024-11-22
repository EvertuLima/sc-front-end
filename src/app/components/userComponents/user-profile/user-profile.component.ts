import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCurrentUser,
  selectCurrentUserLoading,
} from '../../../store/userStore/user.selectors';
import { RoomModel } from '../../../models/room.model';
import { RoomListComponent } from '../../roomComponents/room-list/room-list.component';
import { loadCurrentUser } from '../../../store/userStore/user.actions';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RoomListComponent, AsyncPipe, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  isLoading$ = this.store.select(selectCurrentUserLoading);

  rooms$ = new Observable<RoomModel[]>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCurrentUser());
  }
}
