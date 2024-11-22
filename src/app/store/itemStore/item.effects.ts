import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from '../../services/itemService/item.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  createItem,
  createItemFailure,
  createItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
} from './item.actions';
import { loginSuccess } from '../authStore/auth.actions';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private itemService: ItemService) {}

  loadItemsAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => loadItems())
    )
  );
  
  
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.itemService.getAllItems().pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  createItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createItem),
      mergeMap(({ item }) =>
        this.itemService.postItem(item).pipe(
          map((newItem) => createItemSuccess({ item: newItem })),
          catchError((error) =>
            of(createItemFailure({ error: error.message || 'Unknown error' }))
          )
        )
      )
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItem),
      mergeMap(({ itemId }) =>
        this.itemService.deleteItem(itemId).pipe(
          map(() => deleteItemSuccess({ itemId: itemId })),
          catchError((error) => of(deleteItemFailure({ error: error.message })))
        )
      )
    )
  );

  updateItem = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItem),
      mergeMap(({ itemId, updatedData }) =>
        this.itemService.updateItem(itemId, updatedData).pipe(
          map((updatedData) => updateItemSuccess({ item: updatedData })),
          catchError((error) => of(updateItemFailure({ error })))
        )
      )
    )
  );
}
