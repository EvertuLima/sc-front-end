import { createAction, props } from '@ngrx/store';
import { ItemModel } from '../../models/item.model';

export const loadItems = createAction('[Item] Load Items');

export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ items: ItemModel[] }>()
);

export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: string }>()
);

export const createItem = createAction(
  '[Item] Create Item',
  props<{ item: ItemModel }>()
);

export const createItemSuccess = createAction(
  '[Item] Create Item Success',
  props<{ item: ItemModel }>()
);

export const createItemFailure = createAction(
  '[Item] Create Item Failure',
  props<{ error: string }>()
);

export const deleteItem = createAction(
  '[Item] Delete Item',
  props<{ itemId: number }>()
);

export const deleteItemSuccess = createAction(
  '[Item] Delete Item Success',
  props<{ itemId: number }>()
);

export const deleteItemFailure = createAction(
  '[Item] Delete Item Failure',
  props<{ error: string }>()
);

export const updateItem = createAction(
  '[Item] Update Item',
  props<{ itemId: number, updatedData: Partial<ItemModel> }>()
);

export const updateItemSuccess = createAction(
  '[Item] Update Item Success',
  props<{ item: ItemModel }>()
);

export const updateItemFailure = createAction(
  '[Item] Update Item Failure',
  props<{ error: string }>()
);
