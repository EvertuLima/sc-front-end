import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ItemModel } from '../../../models/item.model';
import { selectItemById } from '../../../store/itemStore/item.selectors';
import { MatButtonModule } from '@angular/material/button';
import { CommentModel } from '../../../models/comment.model';
import { selectCommentsByItemId } from '../../../store/commentStore/comment.selectors';
import { loadComments } from '../../../store/commentStore/comment.actions';
import { CommentListComponent } from "../../comment/comment-list/comment-list.component";

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommentListComponent,
],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent implements OnInit {
  itemId = input.required<number>();
  item$: Observable<ItemModel | undefined>;
  comments$: Observable<CommentModel[]>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.item$ = new Observable();
    this.comments$ = new Observable();
  }

  ngOnInit(): void {
    this.store.dispatch(loadComments())
    this.item$ = this.store.select(selectItemById(+this.itemId()));
    this.comments$ = this.store.select(selectCommentsByItemId(+this.itemId()));
  }

  goBackRoom() {
    this.item$.pipe(take(1)).subscribe((item) => {
      this.router.navigate(['/rooms', item?.location]);
    });
  }
}
