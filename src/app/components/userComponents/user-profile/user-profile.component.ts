import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import {
  selectCurrentUser,
  selectCurrentUserLoading,
} from '../../../store/userStore/user.selectors';
import { RoomListComponent } from '../../roomComponents/room-list/room-list.component';
import { loadCurrentUser } from '../../../store/userStore/user.actions';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { selectMyComments } from '../../../store/commentStore/comment.selectors';
import { CommentModel } from '../../../models/comment.model';
import { CommentListComponent } from "../../comment/comment-list/comment-list.component";
import { loadComments } from '../../../store/commentStore/comment.actions';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RoomListComponent, AsyncPipe, MatIconModule, CommentListComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  isLoading$ = this.store.select(selectCurrentUserLoading);
  myComments$: Observable<CommentModel[]>

  constructor(private store: Store) {
    this.myComments$ = new Observable()
  }

  ngOnInit(): void {
    this.store.dispatch(loadCurrentUser());
    this.store.dispatch(loadComments());
    this.user$.pipe(take(1)).subscribe(user => {
      this.myComments$ = this.store.select(selectMyComments(user.id))
    })
  }
}
